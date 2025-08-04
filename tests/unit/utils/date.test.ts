import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { formatRelativeTime } from '~/views/translation/utils/date'

describe('date utils', () => {
  describe('formatRelativeTime', () => {
    let mockDate: Date

    beforeEach(() => {
      // Mock the current date to 2024-01-15
      mockDate = new Date('2024-01-15T12:00:00Z')
      vi.useFakeTimers()
      vi.setSystemTime(mockDate)
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should return "today" for current date', () => {
      const result = formatRelativeTime('2024-01-15T12:00:00Z')
      expect(result).toBe('today')
    })

    it('should return "today" for date within same day', () => {
      const result = formatRelativeTime('2024-01-15T08:00:00Z')
      expect(result).toBe('today')
    })

    it('should return "1 day ago" for yesterday', () => {
      const result = formatRelativeTime('2024-01-14T12:00:00Z')
      expect(result).toBe('1 day ago')
    })

    it('should return "2 days ago" for two days ago', () => {
      const result = formatRelativeTime('2024-01-13T12:00:00Z')
      expect(result).toBe('2 days ago')
    })

    it('should return "7 days ago" for a week ago', () => {
      const result = formatRelativeTime('2024-01-08T12:00:00Z')
      expect(result).toBe('7 days ago')
    })

    it('should return "30 days ago" for a month ago', () => {
      const result = formatRelativeTime('2023-12-16T12:00:00Z')
      expect(result).toBe('30 days ago')
    })

    it('should return "365 days ago" for a year ago', () => {
      const result = formatRelativeTime('2023-01-15T12:00:00Z')
      expect(result).toBe('365 days ago')
    })

    it('should handle Date objects', () => {
      const date = new Date('2024-01-14T12:00:00Z')
      const result = formatRelativeTime(date)
      expect(result).toBe('1 day ago')
    })

    it('should handle string dates in different formats', () => {
      const result1 = formatRelativeTime('2024-01-14')
      const result2 = formatRelativeTime('2024-01-14T00:00:00.000Z')
      const result3 = formatRelativeTime('2024-01-14T12:00:00')

      expect(result1).toBe('1 day ago')
      expect(result2).toBe('1 day ago')
      expect(result3).toBe('1 day ago')
    })

    it('should handle edge case of exactly 24 hours ago', () => {
      const result = formatRelativeTime('2024-01-14T12:00:00Z')
      expect(result).toBe('1 day ago')
    })

    it('should handle edge case of just under 24 hours ago', () => {
      const result = formatRelativeTime('2024-01-14T13:00:00Z')
      expect(result).toBe('today')
    })

    it('should handle edge case of just over 24 hours ago', () => {
      const result = formatRelativeTime('2024-01-14T11:00:00Z')
      expect(result).toBe('1 day ago')
    })

    it('should handle future dates (edge case)', () => {
      const result = formatRelativeTime('2024-01-16T12:00:00Z')
      expect(result).toBe('today')
    })

    it('should handle very old dates', () => {
      const result = formatRelativeTime('2020-01-15T12:00:00Z')
      expect(result).toBe('1461 days ago')
    })

    it('should handle dates with milliseconds', () => {
      const result = formatRelativeTime('2024-01-14T12:00:00.123Z')
      expect(result).toBe('today')
    })

    it('should handle invalid date strings gracefully', () => {
      // This test assumes the function handles invalid dates gracefully
      // If it doesn't, this test would need to be updated
      expect(() => formatRelativeTime('invalid-date')).not.toThrow()
    })
  })
})
