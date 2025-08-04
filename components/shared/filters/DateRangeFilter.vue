<script lang="ts" setup>
import Button from '~/components/ui/Button.vue'
import DatePicker from '~/components/ui/DatePicker.vue'
import Overlay from '~/components/ui/Overlay.vue'

interface Props {
  dateFrom: string
  dateTo: string
  label?: string
  ariaLabel?: string
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Date range',
  ariaLabel: 'Filter by date range',
  errorMessage: 'End date must be after start date',
})
const emit = defineEmits<{
  'update:dateRange': [from: string, to: string]
}>()

// Popover state (local component state)
const showDateFilter = ref(false)

// Local state for date selection before applying
const localDateFrom = ref('')
const localDateTo = ref('')

// Initialize local state when popover opens
watch(showDateFilter, isVisible => {
  if (isVisible) {
    localDateFrom.value = props.dateFrom
    localDateTo.value = props.dateTo
  }
})

// Date formatting function
const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Validation
const isDateRangeValid = computed(() => {
  if (!localDateFrom.value || !localDateTo.value) return true
  const fromDate = new Date(localDateFrom.value)
  const toDate = new Date(localDateTo.value)
  return fromDate <= toDate
})

const errorMessage = computed(() => {
  if (!localDateFrom.value || !localDateTo.value) return ''
  if (!isDateRangeValid.value) {
    return props.errorMessage
  }
  return ''
})

const handleDateFromChange = (value: string | Date | [Date, Date] | null) => {
  // Handle single date selection (not range)
  if (value instanceof Date) {
    localDateFrom.value = value.toISOString().split('T')[0]
  } else if (typeof value === 'string') {
    localDateFrom.value = value
  } else {
    localDateFrom.value = ''
  }
}

const handleDateToChange = (value: string | Date | [Date, Date] | null) => {
  // Handle single date selection (not range)
  if (value instanceof Date) {
    localDateTo.value = value.toISOString().split('T')[0]
  } else if (typeof value === 'string') {
    localDateTo.value = value
  } else {
    localDateTo.value = ''
  }
}

const handleApply = () => {
  if (isDateRangeValid.value) {
    emit('update:dateRange', localDateFrom.value, localDateTo.value)
    closeDateFilter()
  }
}

const handleClear = () => {
  localDateFrom.value = ''
  localDateTo.value = ''
  emit('update:dateRange', '', '')
  closeDateFilter()
}

const handleFilterClick = (event: MouseEvent) => {
  showDateFilter.value = !showDateFilter.value
}

const closeDateFilter = () => {
  showDateFilter.value = false
}
</script>

<template>
  <Overlay
    v-model:visible="showDateFilter"
    position="bottom"
    width="xl"
    :offset="8"
    trigger="manual"
    role="dialog"
  >
    <template #trigger>
      <Button
        :label="props.label"
        :aria-label="props.ariaLabel"
        variant="secondary"
        :aria-expanded="showDateFilter"
        aria-haspopup="true"
        @click="handleFilterClick"
      />
    </template>

    <div class="date-inputs">
      <div class="date-inputs-row">
        <div class="date-input-group">
          <label for="date-from" class="date-label">From</label>
          <DatePicker
            id="date-from"
            :model-value="localDateFrom ? new Date(localDateFrom) : null"
            :placeholder="
              localDateFrom ? formatDate(localDateFrom) : 'Select start date'
            "
            aria-label="Date from"
            @update:model-value="handleDateFromChange"
          />
        </div>
        <div class="date-input-group">
          <label for="date-to" class="date-label">To</label>
          <DatePicker
            id="date-to"
            :model-value="localDateTo ? new Date(localDateTo) : null"
            :placeholder="
              localDateTo ? formatDate(localDateTo) : 'Select end date'
            "
            aria-label="Date to"
            @update:model-value="handleDateToChange"
          />
        </div>
      </div>

      <!-- Error message -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Action buttons -->
      <div class="action-buttons">
        <Button
          label="Apply"
          variant="primary"
          size="sm"
          :disabled="!isDateRangeValid"
          @click="handleApply"
        />
      </div>
    </div>
  </Overlay>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;
@use '~/assets/scss/mixins' as mix;

.date-inputs {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  .date-input-group {
    @include mix.flex-column;
    gap: $spacing-xs;

    .date-label {
      font-size: $font-size-xs;
      font-weight: $font-weight-medium;
      color: $color-text-secondary;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  .error-message {
    color: $color-error;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    padding: $spacing-xs $spacing-sm;
  }

  .action-buttons {
    display: flex;
    gap: $spacing-sm;
    justify-content: flex-end;
    padding-top: $spacing-sm;
    border-top: 1px solid $color-shade-200;
  }
}

// Add styles for side-by-side date pickers
.date-inputs {
  .date-inputs-row {
    display: flex;
    gap: $spacing-md;
    align-items: flex-end;
  }
}
</style>
