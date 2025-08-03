<script lang="ts" setup>
interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  ariaLabel?: string
  id?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Select date',
  disabled: false,
  readonly: false,
  ariaLabel: 'Date picker',
  id: undefined
})

const emit = defineEmits<Emits>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
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
    <input
      :id="id"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :aria-label="ariaLabel"
      class="date-picker__input"
      @input="handleInput"
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
    @include mix.input-base;
    width: 100%;
    text-align: center;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--shade-50);
    }
    
    &:readonly {
      background-color: var(--shade-50);
      cursor: default;
    }
  }
}
</style> 