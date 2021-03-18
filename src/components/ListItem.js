import React from 'react'

const ListItem = ({ video }) => {
    return ( 
        <li>{Math.round(video.statistics.score)} | {video.snippet.title} by {video.snippet.channelTitle}</li>
    )
}

export default ListItem