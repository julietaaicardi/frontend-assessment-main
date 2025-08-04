<script lang="ts" setup>
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

import TranslationView from '~/views/translation/TranslationView.vue'
</script>

<template>
  <div class="translation-keys-page">
    <!-- Translation View -->
    <TranslationView />
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
