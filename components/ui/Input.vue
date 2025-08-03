<script lang="ts" setup>
interface Props {
  placeholder?: string
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
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
  placeholder: '',
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  ariaLabel: undefined,
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
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    :readonly="readonly"
    :aria-label="ariaLabel"
    class="input"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.input {
  @include mix.input-base;
  
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
</style> 