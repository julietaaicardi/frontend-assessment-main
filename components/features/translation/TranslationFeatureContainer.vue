<script lang="ts" setup>
import { useTranslationCoordination } from '~/stores'
import TranslationFiltersContainer from './TranslationFiltersContainer.vue'
import TranslationTableContainer from './TranslationTableContainer.vue'

const { fetchKeys, filtersStore } = useTranslationCoordination()

// Initial data fetch
onMounted(async () => {
  await fetchKeys()
})

// Watch for specific filter changes and refetch data
watch(
  [
    () => filtersStore.searchValue,
    () => filtersStore.dateFrom,
    () => filtersStore.dateTo,
    () => filtersStore.pageSize,
    () => filtersStore.page
  ],
  async () => {
    await fetchKeys()
  },
  { immediate: false }
)
</script>

<template>
  <div class="translation-feature">
    <TranslationFiltersContainer />
    <TranslationTableContainer :pagination="true" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;

.translation-feature {
  display: flex;
  flex-direction: column;
  gap: vars.$spacing-xl;
}
</style> 