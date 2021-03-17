import React from 'react'
import ListItem from './ListItem' 

const List = ({ videos }) => {
    console.log(videos)
    return videos.map(video => <ListItem key={video.id.videoId} video={video} />)
}

export default List