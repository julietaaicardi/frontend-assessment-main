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
})

import { useRootStore } from '~/stores'
import TranslationFeatureContainer from '~/components/features/translation/TranslationFeatureContainer.vue'

const rootStore = useRootStore()

// Computed properties from stores
const totalKeys = computed(() => 15000) // This will be updated by the feature container
const isLoading = computed(() => rootStore.isLoading)
const hasError = computed(() => rootStore.hasError)
</script>

<template>
  <div class="translation-keys-page">
    <!-- Translation Feature Container -->
    <TranslationFeatureContainer />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;

.translation-keys-page {
  display: flex;
  flex-direction: column;
  gap: vars.$spacing-xl;
}

// Main Content
.main-content {
  display: flex;
  flex-direction: column;
  gap: vars.$spacing-lg;
}

.loading-state,
.error-state {
  text-align: center;
  padding: vars.$spacing-xl;
  color: vars.$color-text-secondary;
}

.error-state {
  color: vars.$color-error;
}
</style>
