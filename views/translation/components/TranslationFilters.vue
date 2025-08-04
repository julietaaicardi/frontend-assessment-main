<script lang="ts" setup>
import { useTranslationCoordination } from '~/stores'
import SearchFilter from '~/components/shared/filters/SearchFilter.vue'
import DateRangeFilter from '~/components/shared/filters/DateRangeFilter.vue'
import PageSizeFilter from '~/components/shared/filters/PageSizeFilter.vue'

const { filtersStore, updateSearchValue, updateDateRange, updatePageSize } =
  useTranslationCoordination()

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
  <div class="translation-filters">
    <!-- Search Filter -->
    <div class="search-container">
      <SearchFilter
        :model-value="searchValue"
        placeholder="Search for keys"
        aria-label="Search for translation keys"
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
@use '~/assets/scss/abstracts' as *;
@use '~/assets/scss/mixins' as mix;

.translation-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-lg;
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
  gap: $spacing-sm;
}

// Responsive adjustments
@include mix.respond-to(sm) {
  .search-container {
    max-width: none;
  }
}
</style>
