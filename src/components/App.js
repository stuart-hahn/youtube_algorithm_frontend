import React, { useState } from 'react';

import youtube from '../apis/youtube'
import Search from './Search';
import List from './List'

function App() {

  const [videos, setVideos] = useState([])
  const [topTen, setTopTen] = useState([])

  const onSearchTermSubmit = async (searchTerm) => {
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

    setVideos(vidRes.data.items)
  }

  // commentCount: "915019"
  // dislikeCount: "863173"
  // favoriteCount: "0"
  // likeCount: "16488362"
  // viewCount: "2804833356"

  const sortVideos = (videos) => {
    return videos.map(video => {
      let viewCount = video.statistics.viewCount
      let dislikeCount = video.statistics.dislikeCount
      let likeCount = video.statistics.likeCount

      let score = viewCount / (likeCount - dislikeCount)

      console.log(score)
    })
  }

  if (videos.length > 1) {
    sortVideos(videos)
  }

  return (
    <div className="App">
      <Search onSearchTermSubmit={onSearchTermSubmit} />
      <ol><List videos={videos} /></ol>
    </div>
  );
}

export default App;

