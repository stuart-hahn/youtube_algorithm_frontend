import React, { useState } from 'react';

import youtube from '../apis/youtube'
import Search from './Search';
import List from './List'

function App() {

  const [videos, setVideos] = useState([])

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
      let viewCount = parseInt(video.statistics.viewCount)
      let dislikeCount = parseInt(video.statistics.dislikeCount) + 1
      let likeCount = parseInt(video.statistics.likeCount)

      let likeRatio = (dislikeCount / likeCount) * 100
      let score = viewCount / likeRatio

      video.statistics.score = score
      return video
    })
  }

  if (videos.length > 0) {
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

