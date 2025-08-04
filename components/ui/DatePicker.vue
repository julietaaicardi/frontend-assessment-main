<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

interface Props {
  modelValue?: string | Date | [Date, Date] | null
  placeholder?: string
  disabled?: boolean
  ariaLabel?: string
  id?: string
  range?: boolean
  minDate?: Date
  maxDate?: Date
}

interface Emits {
  (e: 'update:modelValue', value: string | Date | [Date, Date] | null): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Select date',
  disabled: false,
  ariaLabel: 'Date picker',
  id: undefined,
  range: false,
  minDate: undefined,
  maxDate: undefined
})

const emit = defineEmits<Emits>()

const handleUpdate = (value: string | Date) => {
  emit('update:modelValue', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<template>
  <div class="date-picker">
    <Datepicker
      :id="id"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="ariaLabel"
      :range="range"
      :min-date="minDate"
      :max-date="maxDate"
      :enable-time-picker="false"
      :clearable="false"
      :auto-apply="true"
      :teleport="true"
      teleport-to="body"
      format="MMM dd, yyyy"
      class="date-picker__input"
      @update:model-value="handleUpdate"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.date-picker {
  position: relative;
  
  &__input {
    width: 100%;
    text-align: center;
    
    :deep(.dp__input) {
      @include mix.input-base;
      width: 100%;
      text-align: center;
      padding: vars.$spacing-sm vars.$spacing-md;
      background-color: var(--shade-0);
      font-size: vars.$font-size-sm;
      cursor: pointer;
      
      &:focus {
        outline: none;
        border-color: var(--primary-500);
        box-shadow: 0 0 0 2px var(--primary-100);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: var(--shade-50);
      }
    }
    
    // Remove calendar icon
    :deep(.dp__input_icon) {
      display: none;
    }
    
    // Hide the calendar icon container
    :deep(.dp__input_wrap) {
      position: relative;
      
      &::after {
        display: none;
      }
    }
    
    // Ensure calendar dropdown is visible
    :deep(.dp__main) {
      z-index: 99999;
      position: fixed;
    }
    
    :deep(.dp__outer_menu) {
      z-index: 99999;
      position: fixed;
    }
    
    :deep(.dp__menu) {
      z-index: 99999;
      position: fixed;
    }
    
    :deep(.dp__calendar) {
      z-index: 99999;
      position: fixed;
    }
    
    :deep(.dp__calendar_header) {
      z-index: 99999;
    }
    
    :deep(.dp__calendar_row) {
      z-index: 99999;
    }
  }
}
</style> 