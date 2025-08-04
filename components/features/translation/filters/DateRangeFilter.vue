<script lang="ts" setup>
import Button from '~/components/ui/Button.vue'
import DatePicker from '~/components/ui/DatePicker.vue'
import Overlay from '~/components/ui/Overlay.vue'

interface Props {
  dateFrom: string
  dateTo: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:dateRange': [from: string, to: string]
}>()

// Popover state (local component state)
const showDateFilter = ref(false)

const handleDateFromChange = (value: string) => {
  emit('update:dateRange', value, props.dateTo)
}

const handleDateToChange = (value: string) => {
  emit('update:dateRange', props.dateFrom, value)
  // Automatically close the popover and apply the filter when To date is selected
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
    width="lg"
    :offset="8"
    trigger="manual"
    role="dialog"
  >
    <template #trigger>
      <Button
        label="Updated at"
        aria-label="Filter by update date"
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
  </Overlay>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

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
</style> 