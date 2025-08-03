<script lang="ts" setup>
interface Props {
  searchValue?: string
  dateFrom?: string
  dateTo?: string
  pageSize?: number
}

interface Emits {
  (e: 'update:searchValue', value: string): void
  (e: 'update:dateFrom', value: string): void
  (e: 'update:dateTo', value: string): void
  (e: 'update:pageSize', value: number): void
}

const props = withDefaults(defineProps<Props>(), {
  searchValue: '',
  dateFrom: 'Oct 17, 2021',
  dateTo: 'Oct 17, 2021',
  pageSize: 10
})

const emit = defineEmits<Emits>()

// Popover state
const showDateFilter = ref(false)
const filterButtonRef = ref<HTMLElement>()

const handleSearchChange = (value: string) => {
  emit('update:searchValue', value)
}

const handleDateFromChange = (value: string) => {
  emit('update:dateFrom', value)
}

const handleDateToChange = (value: string) => {
  emit('update:dateTo', value)
  // Automatically close the popover and apply the filter when To date is selected
  closeDateFilter()
}

const handleFilterClick = (event: MouseEvent) => {
  showDateFilter.value = !showDateFilter.value
}

const handlePageSizeClick = (event: MouseEvent) => {
  // Placeholder for page size logic
  console.log('Page size button clicked')
}

const closeDateFilter = () => {
  showDateFilter.value = false
}
</script>

<template>
  <div class="translation-filters">
    <!-- Search Input -->
    <div class="search-container">
      <Input
        placeholder="Search for keys"
        :model-value="searchValue"
        aria-label="Search for translation keys"
        @update:model-value="handleSearchChange"
      />
    </div>

    <!-- Filter Controls -->
    <div class="filter-controls">
      <Button
        ref="filterButtonRef"
        label="Updated at"
        aria-label="Filter by update date"
        variant="secondary"
        :aria-expanded="showDateFilter"
        aria-haspopup="true"
        @click="handleFilterClick"
      />
      <Button
        label="Page size"
        aria-label="Change page size"
        variant="secondary"
        @click="handlePageSizeClick"
      />
    </div>

    <!-- Date Range Filter Popover -->
    <Popover
      v-model:visible="showDateFilter"
      position="bottom"
      width="lg"
      :offset="8"
    >
      <div class="date-inputs">
        <div class="date-inputs-row">
          <div class="date-input-group">
            <label for="date-from" class="date-label">From</label>
            <DatePicker
              id="date-from"
              :model-value="dateFrom"
              aria-label="Date from"
              readonly
              @update:model-value="handleDateFromChange"
            />
          </div>
          <div class="date-input-group">
            <label for="date-to" class="date-label">To</label>
            <DatePicker
              id="date-to"
              :model-value="dateTo"
              aria-label="Date to"
              readonly
              @update:model-value="handleDateToChange"
            />
          </div>
        </div>
      </div>
    </Popover>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.translation-filters {
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

.date-inputs {
  display: flex;
  flex-direction: column;
  gap: vars.$spacing-md;
  
  .date-input-group {
    @include mix.flex-column;
    gap: vars.$spacing-xs;
    
    .date-label {
      font-size: vars.$font-size-xs;
      font-weight: vars.$font-weight-medium;
      color: vars.$color-text-secondary;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
}

// Add styles for side-by-side date pickers
.date-inputs {
  .date-inputs-row {
    display: flex;
    gap: vars.$spacing-md;
    align-items: flex-end;
  }
}

// Responsive adjustments
@include mix.respond-to(sm) {
  .search-container {
    max-width: none;
  }
}
</style> 