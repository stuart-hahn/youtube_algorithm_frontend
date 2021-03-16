import React from 'react'

const ListItem = ({ video }) => {
    console.log(video)
    return ( 
        <li>{video.snippet.title}</li>
    )
}

export default ListItem