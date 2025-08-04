<script lang="ts" setup>
import { useTranslationCoordination } from '~/stores'
import SearchFilter from './filters/SearchFilter.vue'
import DateRangeFilter from './filters/DateRangeFilter.vue'
import PageSizeFilter from './filters/PageSizeFilter.vue'

const { filtersStore, updateSearchValue, updateDateRange, updatePageSize } = useTranslationCoordination()

// Computed properties for reactive store values
const searchValue = computed(() => filtersStore.searchValue)
const dateFrom = computed(() => filtersStore.dateFrom)
const dateTo = computed(() => filtersStore.dateTo)
const pageSize = computed(() => filtersStore.pageSize)

const handleSearchChange = (value: string) => {
  updateSearchValue(value)
}

const handleDateRangeChange = (from: string, to: string) => {
  updateDateRange(from, to)
}

const handlePageSizeChange = (size: number) => {
  updatePageSize(size)
}
</script>

<template>
  <div class="translation-filters-container">
    <!-- Search Filter -->
    <div class="search-container">
      <SearchFilter
        :model-value="searchValue"
        @update:model-value="handleSearchChange"
      />
    </div>

    <!-- Filter Controls -->
    <div class="filter-controls">
      <DateRangeFilter
        :date-from="dateFrom"
        :date-to="dateTo"
        @update:date-range="handleDateRangeChange"
      />
      
      <PageSizeFilter
        :model-value="pageSize"
        @update:model-value="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.translation-filters-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: vars.$spacing-lg;
  flex-wrap: wrap;
  
  @media (max-width: 639px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.search-container {
  flex: 1;
  min-width: 0;
  max-width: 20rem;
}

.filter-controls {
  display: flex;
  align-items: center;
  gap: vars.$spacing-sm;
}

// Responsive adjustments
@include mix.respond-to(sm) {
  .search-container {
    max-width: none;
  }
}
</style> 