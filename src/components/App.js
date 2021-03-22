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
    
    const videoIds = res.data.items.map(video => video.id.videoId).toString()
    
    const vidRes = await youtube.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: videoIds
      }
    })

    setVideos(vidRes.data.items)
  }

  const getChannelInfo = (videos) => {
    videos.map(async video => {
      const channelId = video.snippet.channelId.toString()
      const channelRes = await youtube.get("/channels", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: channelId
        }
      })
      video.statistics.channelSubscriberCount = channelRes.data.items[0].statistics.subscriberCount || 0
      return video
    })
  }

  const sortVideos = async (videos) => {
    return videos.map(video => {

      let subCount = parseInt(video.statistics.channelSubscriberCount)
      let viewCount = parseInt(video.statistics.viewCount) 
      let dislikeCount = parseInt(video.statistics.dislikeCount) + 1
      let likeCount = parseInt(video.statistics.likeCount)

      let viewToSubRatio = (viewCount / subCount)
      let likeRatio = (dislikeCount / likeCount) * 100
      let score = viewToSubRatio
      console.log(viewToSubRatio)

      video.statistics.score = score
      if (viewCount < 1000 || viewToSubRatio === Infinity) {
        video.statistics.score = 0
      }
      return video
    })
  }
  
  getChannelInfo(videos)
  sortVideos(videos)

  return (
    <div className="App">
      <Search onSearchTermSubmit={onSearchTermSubmit} />
      <ol><List videos={videos} /></ol>
    </div>
  );
}

export default App;

