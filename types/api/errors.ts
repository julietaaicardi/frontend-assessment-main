/**
 * API error types
 */

/**
 * Standard API error structure
 */
export interface ApiError {
  message: string
  status?: number
  code?: string
}
