<script lang="ts" setup>
import { useTranslationCoordination } from '~/stores'
import TranslationFilters from './components/TranslationFilters.vue'
import TranslationTable from './components/TranslationTable.vue'
import SectionTitle from '~/components/ui/SectionTitle.vue'

const { fetchKeys, filtersStore, tableStore } = useTranslationCoordination()

// Computed property for the section title with count
const sectionTitle = computed(() => {
  const count = tableStore.totalCount
  return `${count.toLocaleString()} Keys`
})

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
    () => filtersStore.page,
  ],
  async () => {
    await fetchKeys()
  },
  { immediate: false }
)
</script>

<template>
  <div class="translation-view">
    <TranslationFilters />
    <SectionTitle :text="sectionTitle" />
    <TranslationTable :pagination="true" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;

.translation-view {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
}
</style>
