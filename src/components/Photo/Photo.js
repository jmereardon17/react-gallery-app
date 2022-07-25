import React from 'react';

const Photo = ({ id, server, secret, title }) => <img src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title} />;

export default Photo;