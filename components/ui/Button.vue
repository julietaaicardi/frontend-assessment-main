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
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.button {
  @include mix.button-base;

  // Variants
  &--primary {
    background-color: vars.$color-primary;
    color: white;
    border-color: vars.$color-primary;

    &:hover:not(:disabled) {
      background-color: var(--primary-600);
      border-color: var(--primary-600);
    }
  }

  &--secondary {
    background-color: var(--shade-100);
    color: vars.$color-text-primary;
    border-color: vars.$color-border;

    &:hover:not(:disabled) {
      background-color: var(--shade-200);
    }
  }

  &--ghost {
    background-color: transparent;
    color: vars.$color-text-primary;
    border-color: transparent;

    &:hover:not(:disabled) {
      background-color: var(--shade-100);
    }
  }

  // Sizes
  &--sm {
    padding: vars.$spacing-xs vars.$spacing-sm;
    font-size: vars.$font-size-xs;
  }

  &--md {
    padding: vars.$spacing-sm vars.$spacing-md;
    font-size: vars.$font-size-sm;
  }

  &--lg {
    padding: vars.$spacing-md vars.$spacing-lg;
    font-size: vars.$font-size-base;
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
