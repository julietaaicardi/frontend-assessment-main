<script lang="ts" setup>
import type { Row } from '~/types/ui/table'

interface Props {
  row?: Row
  rowIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  rowIndex: 0,
})
</script>

<template>
  <tr class="table-row">
    <slot />
  </tr>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;

.table-row {
  border-bottom: 1px solid var(--shade-100);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--shade-25);
  }

  &:last-child {
    border-bottom: none;
  }
}
</style>
