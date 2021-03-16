import React, { useState } from 'react';

import youtube from '../apis/youtube'
import Search from './Search';
import List from './List'

function App() {

  const [videos, setVideos] = useState([])

  let onSearchTermSubmit = async (searchTerm) => {
    await youtube.get("/search", {
      params: {
        q: searchTerm
      }
    }).then(res => setVideos(res.data.items))
  }

  return (
    <div className="App">
      <Search onSearchTermSubmit={onSearchTermSubmit} />
      <ol><List videos={videos} /></ol>
    </div>
  );
}

export default App;
