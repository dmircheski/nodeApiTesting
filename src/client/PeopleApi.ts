import axios from 'axios'

export default axios.create({
    baseURL: 'https://people-api1.herokuapp.com/api',
    validateStatus: () => true
})