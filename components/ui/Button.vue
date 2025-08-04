<script lang="ts" setup>
interface Props {
  label: string
  ariaLabel?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  disabled: false,
  variant: 'secondary',
  size: 'md',
})

const emit = defineEmits<Emits>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="[
      'button',
      `button--${variant}`,
      `button--${size}`,
      { 'button--disabled': disabled },
    ]"
    :aria-label="ariaLabel || label"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;
@use '~/assets/scss/mixins' as mix;

.button {
  @include mix.button-base;

  // Variants
  &--primary {
    background-color: $color-primary;
    color: white;
    border-color: $color-primary;

    &:hover:not(:disabled) {
      background-color: $color-primary-hover;
      border-color: $color-primary-hover;
    }
  }

  &--secondary {
    background-color: $color-shade-100;
    color: $color-text-primary;
    border-color: $color-border;

    &:hover:not(:disabled) {
      background-color: $color-shade-200;
    }
  }

  &--ghost {
    background-color: transparent;
    color: $color-text-primary;
    border-color: transparent;

    &:hover:not(:disabled) {
      background-color: $color-shade-100;
    }
  }

  // Sizes
  &--sm {
    padding: $spacing-xs $spacing-sm;
    font-size: $font-size-xs;
  }

  &--md {
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
  }

  &--lg {
    padding: $spacing-md $spacing-lg;
    font-size: $font-size-base;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      transform: none;
    }
  }
}
</style>
