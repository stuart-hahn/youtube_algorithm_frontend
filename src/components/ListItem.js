import React from 'react'

const ListItem = ({ video }) => {
    return ( 
        <li>{Math.round(video.statistics.score)} | {video.snippet.title}</li>
    )
}

export default ListItem