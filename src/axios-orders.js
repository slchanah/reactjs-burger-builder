import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-a2f8e.firebaseio.com/'
})

export default instance