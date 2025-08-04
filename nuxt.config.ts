// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Modules
  modules: ['@pinia/nuxt'],

  // CSS configuration
  css: ['~/assets/scss/main.scss'],

  // Components configuration
  components: [
    '~/components',
    '~/components/ui',
    '~/components/containers',
    '~/components/features',
  ],

  nitro: {
    openAPI: {
      meta: {
        title: 'Translation Keys Manager',
        description:
          'Manage translation keys and their values across different locales',
        version: '1.0',
      },
    },
  },
})
