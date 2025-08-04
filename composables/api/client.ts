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
      // Handle common errors
      if (error.response) {
        // Server responded with error status
        console.error('API Error:', error.response.status, error.response.data)
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network Error:', error.request)
      } else {
        // Something else happened
        console.error('Error:', error.message)
      }
      return Promise.reject(error)
    }
  )

  return client
}

// Default client for /items endpoints
export const apiClient = createApiClient('items')

// Future clients (uncomment when needed)
// export const userClient = createApiClient('user')
// export const authClient = createApiClient('auth')

export default apiClient
