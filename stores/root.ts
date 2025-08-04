import { defineStore } from 'pinia'

export interface RootState {
  isLoading: boolean
  error: string | null
}

export const useRootStore = defineStore('root', {
  state: (): RootState => ({
    isLoading: false,
    error: null,
  }),

  getters: {
    hasError: state => state.error !== null,
  },

  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    setError(error: string | null) {
      this.error = error
    },

    clearError() {
      this.error = null
    },
  },
})
