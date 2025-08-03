<script lang="ts" setup>
interface Props {
  position?: 'top' | 'bottom' | 'left' | 'right'
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl'
  offset?: number
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  width: 'auto',
  offset: 8,
  delay: 200
})

const emit = defineEmits<{
  'show': []
  'hide': []
}>()

const tooltipRef = ref<HTMLElement>()
const isVisible = ref(false)
const timeout = ref<NodeJS.Timeout | null>(null)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

// Position calculation
const positionStyle = ref<Record<string, string | number>>({
  position: 'fixed',
  top: '0px',
  left: '0px',
  zIndex: 1000,
  opacity: '0',
  visibility: 'hidden'
})

const calculatePosition = (event: MouseEvent) => {
  let target = event.currentTarget as HTMLElement
  if (!target) {
    target = event.target as HTMLElement
    if (!target) {
      return null
    }
  }
  
  const rect = target.getBoundingClientRect()
  
  // Estimate tooltip dimensions
  const estimatedWidth = props.width === 'lg' ? 320 : props.width === 'md' ? 280 : 240
  const estimatedHeight = 200
  
  let top = 0
  let left = 0
  
  switch (props.position) {
    case 'top':
      top = rect.top - estimatedHeight - props.offset
      left = rect.left + (rect.width / 2) - (estimatedWidth / 2)
      break
    case 'bottom':
      top = rect.bottom + props.offset
      left = rect.left + (rect.width / 2) - (estimatedWidth / 2)
      break
    case 'left':
      top = rect.top + (rect.height / 2) - (estimatedHeight / 2)
      left = rect.left - estimatedWidth - props.offset
      break
    case 'right':
      top = rect.top + (rect.height / 2) - (estimatedHeight / 2)
      left = rect.right + props.offset
      break
  }
  
  // Ensure tooltip stays within viewport
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // Adjust horizontal position
  if (left < 0) left = 10
  if (left + estimatedWidth > viewportWidth) {
    left = viewportWidth - estimatedWidth - 10
  }
  
  // Adjust vertical position
  if (top < 0) top = 10
  if (top + estimatedHeight > viewportHeight) {
    top = viewportHeight - estimatedHeight - 10
  }
  
  return { top, left }
}

const showTooltip = (event: MouseEvent) => {
  if (!isMounted.value) {
    return
  }
  
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
  
  timeout.value = setTimeout(() => {
    const position = calculatePosition(event)
    if (position) {
      positionStyle.value = {
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000,
        opacity: '1',
        visibility: 'visible'
      }
      isVisible.value = true
      emit('show')
    }
  }, props.delay)
}

const hideTooltip = () => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
  
  isVisible.value = false
  positionStyle.value = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: 1000,
    opacity: '0',
    visibility: 'hidden'
  }
  emit('hide')
}

// Lifecycle
onUnmounted(() => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
})
</script>

<template>
  <div 
    class="tooltip-trigger"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot name="trigger" />
  </div>
  
  <Teleport to="body">
    <Transition name="tooltip">
      <div
        v-if="isVisible"
        ref="tooltipRef"
        :class="[
          'tooltip',
          `tooltip--${position}`,
          `tooltip--width-${width}`
        ]"
        :style="positionStyle"
        role="tooltip"
        aria-hidden="false"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.tooltip-trigger {
  display: inline-block;
}

.tooltip {
  background-color: vars.$color-background;
  border: 1px solid vars.$color-border;
  border-radius: vars.$border-radius-lg;
  box-shadow: vars.$shadow-lg;
  padding: vars.$spacing-md;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  
  // Width variants
  &--width-auto {
    width: auto;
  }
  
  &--width-sm {
    width: 12rem;
  }
  
  &--width-md {
    width: 16rem;
  }
  
  &--width-lg {
    width: 20rem;
  }
  
  &--width-xl {
    width: 24rem;
  }
  
  // Position-specific styles
  &--top {
    margin-bottom: 0.5rem;
  }
  
  &--bottom {
    margin-top: 0.5rem;
  }
  
  &--left {
    margin-right: 0.5rem;
  }
  
  &--right {
    margin-left: 0.5rem;
  }
}

// Transition animations
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease-in-out;
}

.tooltip-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}

.tooltip-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}
</style> 