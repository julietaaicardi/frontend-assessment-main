<script lang="ts" setup>
interface Props {
  // Trigger behavior
  trigger?: 'hover' | 'click' | 'focus' | 'manual'
  
  // Positioning
  position?: 'top' | 'bottom' | 'left' | 'right'
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl'
  offset?: number
  
  // Timing
  delay?: number
  hideDelay?: number
  
  // State
  visible?: boolean
  
  // Accessibility
  role?: 'tooltip' | 'dialog' | 'menu'
  ariaLabel?: string
  
  // Advanced features
  autoPosition?: boolean
  flip?: boolean
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  preventOverflow?: boolean
  animation?: 'fade' | 'scale' | 'slide' | 'none'
  maxWidth?: string | number
  maxHeight?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'hover',
  position: 'top',
  width: 'auto',
  offset: 8,
  delay: 200,
  hideDelay: 0,
  visible: undefined,
  role: 'tooltip',
  ariaLabel: '',
  autoPosition: false,
  flip: true,
  closeOnOutsideClick: true,
  closeOnEscape: true,
  preventOverflow: true,
  animation: 'fade',
  maxWidth: '90vw',
  maxHeight: '90vh'
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'show': []
  'hide': []
}>()

// Refs
const overlayRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const isMounted = ref(false)
const internalVisible = ref(false)

// Computed
const isVisible = computed({
  get: () => props.visible !== undefined ? props.visible : internalVisible.value,
  set: (value) => {
    internalVisible.value = value
    emit('update:visible', value)
  }
})

const shouldShow = computed(() => {
  return isVisible.value && isMounted.value
})

const isPopover = computed(() => {
  return props.trigger === 'click' || props.trigger === 'focus'
})

const overlayId = computed(() => {
  return `overlay-${Math.random().toString(36).substr(2, 9)}`
})

const triggerClasses = computed(() => ({
  'overlay-trigger': true,
  'overlay-trigger--popover': isPopover.value
}))

const overlayClasses = computed(() => [
  'overlay',
  `overlay--${props.position}`,
  `overlay--width-${props.width}`,
  `overlay--animation-${props.animation}`
])

// Position calculation
const positionStyle = ref<Record<string, string | number>>({
  position: 'fixed',
  top: '0px',
  left: '0px',
  zIndex: 1000,
  opacity: '0',
  visibility: 'hidden',
  pointerEvents: 'none'
})

const calculatePosition = (event: Event) => {
  // For hover events, use the triggerRef directly since event.currentTarget might not be reliable
  const target = triggerRef.value || (event.currentTarget as HTMLElement)
  if (!target?.getBoundingClientRect) {
    console.log('No valid target found for position calculation')
    return null
  }
  
  const rect = target.getBoundingClientRect()
  const overlayRect = overlayRef.value?.getBoundingClientRect()
  
  // Use actual overlay dimensions if available, otherwise estimate
  const width = overlayRect?.width ?? getEstimatedWidth()
  const height = overlayRect?.height ?? getEstimatedHeight()
  
  return calculateOptimalPosition(rect, { width, height })
}

const getEstimatedWidth = () => {
  switch (props.width) {
    case 'sm': return 192 // 12rem
    case 'md': return 256 // 16rem
    case 'lg': return 320 // 20rem
    case 'xl': return 384 // 24rem
    default: return 240
  }
}

const getEstimatedHeight = () => {
  return 200 // Reasonable default
}

const calculateOptimalPosition = (triggerRect: DOMRect, overlaySize: { width: number, height: number }) => {
  let top = 0
  let left = 0
  let position = props.position
  
  // Calculate initial position
  switch (position) {
    case 'top':
      top = triggerRect.top - overlaySize.height - props.offset
      left = triggerRect.left + (triggerRect.width / 2) - (overlaySize.width / 2)
      break
    case 'bottom':
      top = triggerRect.bottom + props.offset
      left = triggerRect.left + (triggerRect.width / 2) - (overlaySize.width / 2)
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height / 2) - (overlaySize.height / 2)
      left = triggerRect.left - overlaySize.width - props.offset
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height / 2) - (overlaySize.height / 2)
      left = triggerRect.right + props.offset
      break
  }
  
  // Prevent overflow if enabled
  if (props.preventOverflow) {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Adjust horizontal position
    if (left < 0) left = 10
    if (left + overlaySize.width > viewportWidth) {
      left = viewportWidth - overlaySize.width - 10
    }
    
    // Adjust vertical position
    if (top < 0) top = 10
    if (top + overlaySize.height > viewportHeight) {
      top = viewportHeight - overlaySize.height - 10
    }
  }
  
  // Auto-flip if enabled
  if (props.flip && props.preventOverflow) {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    if (position === 'top' && top < 0) {
      position = 'bottom'
      top = triggerRect.bottom + props.offset
    } else if (position === 'bottom' && top + overlaySize.height > viewportHeight) {
      position = 'top'
      top = triggerRect.top - overlaySize.height - props.offset
    } else if (position === 'left' && left < 0) {
      position = 'right'
      left = triggerRect.right + props.offset
    } else if (position === 'right' && left + overlaySize.width > viewportWidth) {
      position = 'left'
      left = triggerRect.left - overlaySize.width - props.offset
    }
  }
  
  return { top, left, position }
}

// Timeout management
const showTimeout = ref<NodeJS.Timeout | null>(null)
const hideTimeout = ref<NodeJS.Timeout | null>(null)

const clearTimeouts = () => {
  if (showTimeout.value) {
    clearTimeout(showTimeout.value)
    showTimeout.value = null
  }
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value)
    hideTimeout.value = null
  }
}

// Event handlers
const handleMouseEnter = (event: MouseEvent) => {
  if (props.trigger === 'hover') {
    showOverlay(event)
  }
}

const handleMouseLeave = (event: MouseEvent) => {
  if (props.trigger === 'hover') {
    hideOverlay()
  }
}

const handleClick = (event: MouseEvent) => {
  if (props.trigger === 'click') {
    toggleOverlay(event)
  }
}

const handleFocus = (event: FocusEvent) => {
  if (props.trigger === 'focus') {
    showOverlay(event)
  }
}

const handleBlur = (event: FocusEvent) => {
  if (props.trigger === 'focus') {
    // Small delay to allow clicking inside overlay
    setTimeout(() => {
      if (!overlayRef.value?.contains(document.activeElement)) {
        hideOverlay()
      }
    }, 100)
  }
}

const showOverlay = (event: Event) => {
  if (!isMounted.value) return
  
  clearTimeouts()
  
  showTimeout.value = setTimeout(async () => {
    await nextTick()
    const position = calculatePosition(event)
    if (position) {
      positionStyle.value = {
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000,
        opacity: '1',
        visibility: 'visible',
        pointerEvents: 'auto'
      }
      isVisible.value = true
      emit('show')
    }
  }, props.delay)
}

const hideOverlay = () => {
  clearTimeouts()
  
  hideTimeout.value = setTimeout(() => {
    isVisible.value = false
    positionStyle.value = {
      position: 'fixed',
      top: '0px',
      left: '0px',
      zIndex: 1000,
      opacity: '0',
      visibility: 'hidden',
      pointerEvents: 'none'
    }
    emit('hide')
  }, props.hideDelay)
}

const toggleOverlay = (event: Event) => {
  if (isVisible.value) {
    hideOverlay()
  } else {
    showOverlay(event)
  }
}

// Outside click handler
const handleOutsideClick = (event: Event) => {
  if (!isVisible.value || !props.closeOnOutsideClick) return
  
  const target = event.target as HTMLElement
  if (overlayRef.value && !overlayRef.value.contains(target)) {
    // Don't close if clicking on the trigger
    if (triggerRef.value && triggerRef.value.contains(target)) return
    
    hideOverlay()
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isVisible.value && props.closeOnEscape) {
    hideOverlay()
  }
}

// Watch for manual trigger changes
watch(isVisible, (newValue) => {
  if (props.trigger === 'manual') {
    if (newValue) {
      // For manual trigger, calculate position immediately before showing
      if (triggerRef.value) {
        const rect = triggerRef.value.getBoundingClientRect()
        const position = calculateOptimalPosition(rect, { 
          width: getEstimatedWidth(), 
          height: getEstimatedHeight() 
        })
        if (position) {
          positionStyle.value = {
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 1000,
            opacity: '1',
            visibility: 'visible',
            pointerEvents: 'auto'
          }
        }
      }
    } else {
      // Hide the overlay
      positionStyle.value = {
        position: 'fixed',
        top: '0px',
        left: '0px',
        zIndex: 1000,
        opacity: '0',
        visibility: 'hidden',
        pointerEvents: 'none'
      }
    }
  }
})

// Lifecycle
onMounted(() => {
  isMounted.value = true
  document.addEventListener('click', handleOutsideClick)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  clearTimeouts()
  document.removeEventListener('click', handleOutsideClick)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div 
    ref="triggerRef"
    class="overlay-trigger"
    :class="triggerClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focus="handleFocus"
    @blur="handleBlur"
    @click="handleClick"
    :aria-describedby="overlayId"
    :aria-haspopup="isPopover"
    :aria-expanded="isVisible"

  >
    <slot name="trigger" />
  </div>
  
  <Teleport to="body">
    <Transition :name="`overlay-${animation}`">
      <div
        v-if="shouldShow"
        ref="overlayRef"
        :id="overlayId"
        :class="overlayClasses"
        :style="{
          ...positionStyle,
          maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
          maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
        }"
        :role="role"
        :aria-label="ariaLabel"
        :aria-hidden="!isVisible"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.overlay-trigger {
  display: inline-block;
  
  &--popover {
    cursor: pointer;
  }
}

.overlay {
  background-color: vars.$color-background;
  border: 1px solid vars.$color-border;
  border-radius: vars.$border-radius-lg;
  box-shadow: vars.$shadow-lg;
  padding: vars.$spacing-md;
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
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.overlay-scale-enter-active,
.overlay-scale-leave-active {
  transition: all 0.2s ease-in-out;
}

.overlay-scale-enter-from,
.overlay-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.overlay-slide-enter-active,
.overlay-slide-leave-active {
  transition: all 0.2s ease-in-out;
}

.overlay-slide-enter-from,
.overlay-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style> 