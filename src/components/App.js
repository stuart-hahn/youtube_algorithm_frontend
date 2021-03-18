import React, { useState } from 'react';

import youtube from '../apis/youtube'
import Search from './Search';
import List from './List'

function App() {

  const [videos, setVideos] = useState([])

  let onSearchTermSubmit = async (searchTerm) => {
    const res = await youtube.get("/search", {
      params: {
        q: searchTerm,
        type: 'video',
        part: 'snippet',
      }
    })
    
    const videoIds = await res.data.items.map(video => video.id.videoId).toString()

    const vidRes = await youtube.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: videoIds
      }
    })

    setVideos(vidRes)
  }

  console.log(videos)

  return (
    <div className="App">
      <Search onSearchTermSubmit={onSearchTermSubmit} />
      <p>hello</p>
    </div>
  );
}

export default App;

