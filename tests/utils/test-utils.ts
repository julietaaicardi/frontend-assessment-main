import { render, type RenderOptions } from '@testing-library/vue'
import { createPinia } from 'pinia'
import type { Component } from 'vue'

// Custom render function with Pinia store
export function renderWithPinia(
  component: Component,
  options: RenderOptions<Component> = {}
) {
  const pinia = createPinia()

  return render(component, {
    global: {
      plugins: [pinia],
      stubs: {
        // Add any global stubs here
      },
    },
    ...options,
  })
}

// Mock API responses
export const mockApiResponse = {
  success: <T>(data: T) => ({
    data,
    status: 200,
    statusText: 'OK',
  }),
  error: (status: number = 500, message: string = 'Internal Server Error') => ({
    data: { message },
    status,
    statusText: 'Error',
  }),
}

// Mock translation data
export const mockTranslationKeys = [
  {
    id: '1',
    key: 'welcome.message',
    value: 'Welcome to our application',
    locale: 'en',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    key: 'button.save',
    value: 'Save',
    locale: 'en',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

// Mock store state
export const mockTranslationStore = {
  keys: mockTranslationKeys,
  loading: false,
  error: null,
  filters: {
    search: '',
    dateRange: null,
    pageSize: 10,
  },
  pagination: {
    page: 1,
    total: 2,
    totalPages: 1,
  },
}

// Test event helpers
export const fireEvent = {
  click: (element: Element) => {
    element.dispatchEvent(new Event('click', { bubbles: true }))
  },
  input: (element: Element, value: string) => {
    if (element instanceof HTMLInputElement) {
      element.value = value
      element.dispatchEvent(new Event('input', { bubbles: true }))
    }
  },
  focus: (element: Element) => {
    element.dispatchEvent(new Event('focus', { bubbles: true }))
  },
  blur: (element: Element) => {
    element.dispatchEvent(new Event('blur', { bubbles: true }))
  },
}
