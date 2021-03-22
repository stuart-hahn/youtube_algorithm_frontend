import React from 'react'
import ListItem from './ListItem' 

const List = ({ videos }) => {
    const sorted = videos.sort((a,b) => b.statistics.score - a.statistics.score)
    const topTen = sorted.slice(0, 10)
    return topTen.map(video => <ListItem key={video.id} video={video} />)
}

export default List