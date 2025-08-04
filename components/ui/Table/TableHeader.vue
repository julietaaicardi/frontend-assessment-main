<script lang="ts" setup>
import { inject } from 'vue'
import type { TableContext } from './types'

// Inject table context
const tableContext = inject<TableContext>('tableContext')

if (!tableContext) {
  throw new Error('TableHeader must be used within a Table component')
}

const { columns } = tableContext
</script>

<template>
  <thead>
    <tr>
      <th
        v-for="column in columns"
        :key="column.key"
        scope="col"
        class="table-header"
        :class="`header-${column.align || 'left'}`"
        :style="column.width ? { width: column.width } : {}"
      >
        <slot :name="`header-${column.key}`" :column="column">
          {{ column.label }}
        </slot>
      </th>
    </tr>
  </thead>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;

.table-header {
  background-color: var(--shade-50);
  padding: $spacing-md;
  text-align: left;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  color: $color-text-secondary;
  letter-spacing: 0.05em;
  border-bottom: 1px solid $color-border;

  &.header-left {
    text-align: left;
  }

  &.header-center {
    text-align: center;
  }

  &.header-right {
    text-align: right;
  }

  &:first-child {
    border-top-left-radius: $border-radius-lg;
  }

  &:last-child {
    border-top-right-radius: $border-radius-lg;
  }
}
</style>
