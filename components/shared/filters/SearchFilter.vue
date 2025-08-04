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

const localValue = ref(props.modelValue)

let debounceTimer: NodeJS.Timeout | null = null

const handleInputChange = (value: string) => {
  localValue.value = value

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    emit('update:modelValue', value)
  }, props.debounceMs)
}

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
