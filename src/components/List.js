import React from 'react'
import ListItem from './ListItem' 

const List = ({ videos }) => {
    return videos.map(video => <ListItem key={video.id.videoId} video={video} />)
}

export default List