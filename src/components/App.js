import React, { useState } from 'react';

import youtube from '../apis/youtube'
import Search from './Search';

function App() {

  const [items, setItems] = useState([])

  let onSearchTermSubmit = async (searchTerm) => {
    await youtube.get("/search", {
      params: {
        q: searchTerm
      }
    }).then(res => setItems(res.data.items))
  }

  return (
    <div className="App">
      <Search onSearchTermSubmit={onSearchTermSubmit} />
      <p>There are {items.length} items.</p>
    </div>
  );
}

export default App;
