<script lang="ts" setup>
// Page metadata
useHead({
  title: "Translation Keys Manager",
  meta: [
    {
      name: "description",
      content: "Manage and view translation keys across different locales",
    },
  ],
});

import { useTranslationCoordination, useRootStore } from '~/stores'

const { tableStore, rootStore, fetchKeys } = useTranslationCoordination()

// Initialize data on page load
onMounted(async () => {
  try {
    await fetchKeys()
  } catch (error) {
    // Error is already handled in the coordination composable
    console.error('Failed to initialize translation keys:', error)
  }
})

// Computed properties from stores
const totalKeys = computed(() => tableStore.totalCount || 15000)
const isLoading = computed(() => rootStore.isLoading)
const hasError = computed(() => rootStore.hasError)
</script>

<template>
  <div class="translation-keys-page">
    <!-- Header Filters -->
    <TranslationFilters />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        Loading translation keys...
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="error-state">
        {{ rootStore.error }}
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Total Keys Display -->
        <SectionTitle :text="`${totalKeys.toLocaleString()} Keys`" />

        <!-- Translation Table -->
        <TranslationTable :pagination="true" />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

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
