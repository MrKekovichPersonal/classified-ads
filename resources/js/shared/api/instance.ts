import axios from "axios"

export const api = axios.create({
  baseURL: '/api',
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
})
