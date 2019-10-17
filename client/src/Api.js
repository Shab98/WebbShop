import axios from 'axios'

export const Api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'https://webshop-gu-backend.herokuapp.com:3000/api'
})
