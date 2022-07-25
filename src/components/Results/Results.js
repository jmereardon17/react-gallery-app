import React from 'react';
import Photo from '../Photo/Photo';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Results = ({ search, photos }) => (
  <section className="photo-container">
    {photos.length > 0 ? (
      <>
        <h2>{search} Gifs</h2>
        <ul>
          {photos.map(photo => (
            <li key={photo.id}>
              <Photo {...photo} />
            </li>
          ))}
        </ul>
      </>
    ) : <ErrorMessage title="No Results Found" text="Your search did not return any results. Please try again." />}
  </section>
);

export default Results;