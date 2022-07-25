import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import API_KEY from './config';
import categories from './categories';
import * as Components from './components';
import './App.css';

const App = () => {
  const key = API_KEY;
  const [currentSearch, setSearch] = useState(null);
  const [photos, setPhotos] = useState({ app: {}, search: {} });
  const [isLoaded, setLoaded] = useState(false);
  const { Layout, Loader, ErrorMessage, Results } = Components;

  const handleSearch = (value, isUser = true) => {
    setLoaded(false);
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${value}&per_page=24&format=json&nojsoncallback=1`)
      .then((res) => {
        setPhotos({ ...photos, ...(isUser ? { search: res.data.photos.photo } : { app: { ...photos.app, [value]: res.data.photos.photo } }) });
        setSearch(value);
        setLoaded(true);
      })
      .catch((err) => console.error(`Error getting photos with the API: ${err}`));
  }

  return (
    <BrowserRouter>
      <div className="container">

        <Layout categories={categories} photos={photos} handleSearch={handleSearch} />
  
        <Routes>
          <Route path="/" element={<Outlet />} />
          {categories.map(category => (
            <Route
              key={category.name}
              path={`/${category.path}`}
              element={isLoaded ? <Results search={category.name} photos={photos.app[category.name]} /> : <Loader text="Loading, please wait..." />} />
          ))}
          <Route path="/search/:query" element={isLoaded ? <Results search={currentSearch} photos={photos.search} /> : <Loader text="Loading, please wait..." />} />
          <Route path="*" element={<ErrorMessage title="Page not found" text="The requested page does not exist." />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
