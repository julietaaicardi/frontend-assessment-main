<script lang="ts" setup>
import Button from '~/components/ui/Button.vue'
import Overlay from '~/components/ui/Overlay.vue'

interface Props {
  modelValue: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

// Popover state (local component state)
const showPageSizeFilter = ref(false)

const pageSizeOptions = [10, 25, 50, 100]

const handlePageSizeChange = (size: number) => {
  emit('update:modelValue', size)
  closePageSizeFilter()
}

const handleFilterClick = (event: MouseEvent) => {
  showPageSizeFilter.value = !showPageSizeFilter.value
}

const closePageSizeFilter = () => {
  showPageSizeFilter.value = false
}
</script>

<template>
  <Overlay
    v-model:visible="showPageSizeFilter"
    position="bottom"
    width="md"
    :offset="8"
    trigger="manual"
    role="dialog"
  >
    <template #trigger>
      <Button
        label="Page size"
        aria-label="Change page size"
        variant="secondary"
        :aria-expanded="showPageSizeFilter"
        aria-haspopup="true"
        @click="handleFilterClick"
      />
    </template>

    <ul class="page-size-options" role="listbox" aria-label="Page size options">
      <li
        v-for="size in pageSizeOptions"
        :key="size"
        role="option"
        :aria-selected="size === modelValue"
        class="page-size-option"
        :class="{ active: size === modelValue }"
        @click="handlePageSizeChange(size)"
      >
        {{ size }} per page
      </li>
    </ul>
  </Overlay>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;
@use '~/assets/scss/mixins' as mix;

.page-size-options {
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;

  .page-size-option {
    padding: $spacing-sm $spacing-md;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    font-size: $font-size-sm;
    color: $color-text-primary;
    transition: background-color 0.2s ease;
    width: 100%;
    margin: 0;

    &:hover {
      background-color: $color-primary-light;
    }

    &.active {
      background-color: $color-primary-light;
      color: $color-primary;
      font-weight: $font-weight-medium;
    }

    &:first-child {
      border-radius: $border-radius-sm $border-radius-sm 0 0;
    }

    &:last-child {
      border-radius: 0 0 $border-radius-sm $border-radius-sm;
    }
  }
}
</style>
