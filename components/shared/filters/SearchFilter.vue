<script lang="ts" setup>
import Input from '~/components/ui/Input.vue'

interface Props {
  modelValue: string
  placeholder?: string
  ariaLabel?: string
  debounceMs?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  ariaLabel: 'Search',
  debounceMs: 400,
})
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Local search value for debouncing
const localValue = ref(props.modelValue)

// Debounced search using setTimeout
let debounceTimer: NodeJS.Timeout | null = null

const handleInputChange = (value: string) => {
  localValue.value = value

  // Clear existing timer
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  // Set new timer
  debounceTimer = setTimeout(() => {
    emit('update:modelValue', value)
  }, props.debounceMs)
}

// Watch for prop changes to update local value
watch(
  () => props.modelValue,
  newValue => {
    localValue.value = newValue
  }
)
</script>

<template>
  <Input
    :placeholder="props.placeholder"
    :model-value="localValue"
    :aria-label="props.ariaLabel"
    @update:model-value="handleInputChange"
  />
</template>
