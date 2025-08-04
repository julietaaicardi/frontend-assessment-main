<script lang="ts" setup>
// Page metadata
useHead({
  title: 'Translation Keys Manager',
  meta: [
    {
      name: 'description',
      content: 'Manage and view translation keys across different locales',
    },
  ],
  htmlAttrs: {
    'data-theme': 'light',
  },
})

import TranslationFeatureContainer from '~/components/features/translation/TranslationFeatureContainer.vue'
</script>

<template>
  <div class="translation-keys-page">
    <!-- Translation Feature Container -->
    <TranslationFeatureContainer />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;

.translation-keys-page {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
}
</style>
