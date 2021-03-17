import React from 'react'

const ListItem = ({ video }) => {
    return ( 
        <li>{video.snippet.title}</li>
    )
}

export default ListItem