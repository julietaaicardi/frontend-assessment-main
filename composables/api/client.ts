import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

// Get configuration from environment variables
const getApiConfig = () => {
  const baseURL =
    process.env.NUXT_PUBLIC_API_BASE_URL || 'https://directus.altura.io'
  const timeout = parseInt(process.env.NUXT_PUBLIC_API_TIMEOUT || '10000')

  return { baseURL, timeout }
}

// Create client factory for different API paths
export const createApiClient = (path: string = 'items'): AxiosInstance => {
  const { baseURL, timeout } = getApiConfig()

  const client = axios.create({
    baseURL: `${baseURL}/${path}`,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
    },
  })

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    error => {
      return Promise.reject(error)
    }
  )

  return client
}

export const apiClient = createApiClient('items')

export default apiClient
