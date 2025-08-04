<script lang="ts" setup>
import type { Column, Row } from '~/types/ui/table'

interface Props {
  column?: Column
  row?: Row
  value?: any
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
})
</script>

<template>
  <td
    class="table-cell"
    :class="`cell-${column?.key || ''} cell-${column?.align || 'left'}`"
  >
    <slot
      :name="`cell-${column?.key}`"
      :row="row"
      :column="column"
      :value="value"
    >
      <span class="cell-content">
        {{ column?.formatter ? column.formatter(value) : value }}
      </span>
    </slot>
  </td>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.table-cell {
  padding: vars.$spacing-md;
  vertical-align: middle;

  &.cell-left {
    text-align: left;
  }

  &.cell-center {
    text-align: center;
  }

  &.cell-right {
    text-align: right;
  }

  .cell-content {
    color: vars.$color-text-primary;
    @include mix.text-truncate;
  }
}

// Responsive adjustments
@include mix.respond-to(md) {
  .table-cell {
    padding: vars.$spacing-lg;
  }
}
</style>
