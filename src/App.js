import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

import API_KEY from './config';
import categories from './categories';
import * as Components from './components';
import './App.css';

const { Layout, Loader, ErrorMessage, Results } = Components;

const App = () => {
  const [currentSearch, setSearch] = useState(null);
  const [photos, setPhotos] = useState({ app: {}, search: {} });
  const [isLoaded, setLoaded] = useState(false);
  const location = useLocation();

  const handleSearch = (value, isUser = true) => {
    setLoaded(false);
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${value}&per_page=24&format=json&nojsoncallback=1`)
      .then((res) => {
        setPhotos({ ...photos, ...(isUser ? { search: res.data.photos.photo } : { app: { ...photos.app, [value]: res.data.photos.photo } }) });
        setSearch(value);
        setLoaded(true);
      })
      .catch((err) => console.error(`Error getting photos with the API: ${err}`));
  }

  useEffect(() => {
    const search = location.pathname.slice('8');
    location.pathname === `/search/${search}` && handleSearch(search);
  }, [location.pathname])

  return (
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
  );
}

export default App;
