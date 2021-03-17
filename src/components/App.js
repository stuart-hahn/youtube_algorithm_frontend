import React, { useState } from 'react';

import youtube from '../apis/youtube'
import Search from './Search';
import List from './List'

function App() {

  const [videos, setVideos] = useState([])
  const [videoIds, setVideoIds] = useState([])

  let onSearchTermSubmit = async (searchTerm) => {
    const res = await youtube.get("/search", {
      params: {
        q: searchTerm,
        type: 'video',
        part: 'snippet',
      }
    })
    
    setVideoIds(res.data.items.map(video => video.id.videoId))

    const videoRes = await youtube.get("/videos", {
      params: {
        part: [
          'snippet',
          'contentDetails',
          'statistics'
        ],
        id: [
           videoIds
        ]
      }
    }
    )

    console.log(videoRes)
  }

  return (
    <div className="App">
      <Search onSearchTermSubmit={onSearchTermSubmit} />
      <p>There are {videoIds.length} videos.</p>
      {/* <ol><List videos={videos} /></ol> */}
    </div>
  );
}

export default App;
