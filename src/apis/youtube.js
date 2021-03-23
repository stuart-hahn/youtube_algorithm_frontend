import axios from 'axios'

const KEY = 'AIzaSyAeeHO4n8vVSAAMlE1GimfbM4FDcApYbM8'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        maxResults: 25,
        key: KEY,
    }
})