import axios from 'axios'

export default axios.create({
    baseURL: 'https://auth-server2.herokuapp.com',
    validateStatus: () => true
})