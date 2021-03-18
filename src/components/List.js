import React from 'react'
import ListItem from './ListItem' 

const List = ({ videos }) => {
    console.log(videos)
    const sorted = videos.sort((a,b) => b.statistics.score - a.statistics.score)
    return sorted.map(video => <ListItem key={video.id} video={video} />)
}

export default List