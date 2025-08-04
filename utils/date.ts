/**
 * Date utility functions
 */

/**
 * Format a date as relative time in days only (e.g., "3 days ago", "365 days ago")
 * @param date - The date to format
 * @returns Formatted relative time string in days
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInMs = now.getTime() - targetDate.getTime()

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
  }

  return 'today'
}
