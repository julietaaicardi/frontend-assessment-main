<script lang="ts" setup>
interface Props {
  position?: 'top' | 'bottom' | 'left' | 'right'
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl'
  visible?: boolean
  trigger?: 'click' | 'hover' | 'focus'
  offset?: number
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
  width: 'auto',
  visible: false,
  trigger: 'click',
  offset: 8
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'show': []
  'hide': []
}>()

const popoverRef = ref<HTMLElement>()
const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

// Position calculation based on trigger element
const positionStyle = ref<Record<string, string | number>>({
  position: 'fixed',
  top: '0px',
  left: '0px',
  zIndex: 1000,
  opacity: '0',
  visibility: 'hidden'
})

// Calculate position before showing popover
const calculatePosition = () => {
  // Get the trigger button
  const triggerButton = document.querySelector('[aria-haspopup="true"][aria-expanded="true"]') as HTMLElement
  if (!triggerButton) return null
  
  const triggerRect = triggerButton.getBoundingClientRect()
  
  // Estimate popover dimensions (we'll use a reasonable default)
  const estimatedWidth = props.width === 'lg' ? 320 : 280 // 20rem = 320px, 16rem = 256px
  const estimatedHeight = 200 // Reasonable estimate for the content
  
  let top = 0
  let left = 0
  
  switch (props.position) {
    case 'top':
      top = triggerRect.top - estimatedHeight - props.offset
      left = triggerRect.left + (triggerRect.width / 2) - (estimatedWidth / 2)
      break
    case 'bottom':
      top = triggerRect.bottom + props.offset
      left = triggerRect.left + (triggerRect.width / 2) - (estimatedWidth / 2)
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height / 2) - (estimatedHeight / 2)
      left = triggerRect.left - estimatedWidth - props.offset
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height / 2) - (estimatedHeight / 2)
      left = triggerRect.right + props.offset
      break
  }
  
  // Ensure popover stays within viewport
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

// Update position when popover becomes visible
watch(isVisible, (newValue) => {
  if (newValue) {
    emit('show')
    
    // Calculate position before showing
    const position = calculatePosition()
    if (position) {
      positionStyle.value = {
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000,
        opacity: '1',
        visibility: 'visible'
      }
    }
    
    // Fine-tune position after render if needed
    nextTick(() => {
      if (popoverRef.value) {
        const finalPosition = calculatePosition()
        if (finalPosition) {
          positionStyle.value = {
            ...positionStyle.value,
            top: `${finalPosition.top}px`,
            left: `${finalPosition.left}px`
          }
        }
      }
    })
  } else {
    emit('hide')
    // Reset position for next time
    positionStyle.value = {
      position: 'fixed',
      top: '0px',
      left: '0px',
      zIndex: 1000,
      opacity: '0',
      visibility: 'hidden'
    }
  }
})

// Auto-hide on outside click
const handleOutsideClick = (event: Event) => {
  if (!isVisible.value) return
  
  const target = event.target as HTMLElement
  if (popoverRef.value && !popoverRef.value.contains(target)) {
    // Don't close if clicking on the trigger button
    if (target.closest('[aria-haspopup="true"]')) return
    
    isVisible.value = false
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isVisible.value) {
    isVisible.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="popover">
      <div
        v-if="isVisible"
        ref="popoverRef"
        :class="[
          'popover',
          `popover--${position}`,
          `popover--width-${width}`
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

.popover {
  background-color: var(--shade-0);
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
.popover-enter-active,
.popover-leave-active {
  transition: all 0.2s ease-in-out;
}

.popover-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.popover-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style> 