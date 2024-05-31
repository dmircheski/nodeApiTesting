import axios from 'axios'

export default axios.create({
    baseURL: 'https://people-api2.herokuapp.com/api',
    validateStatus: () => true
})