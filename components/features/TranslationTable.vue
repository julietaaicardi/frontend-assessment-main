<script lang="ts" setup>
import type { TranslationKey, Column } from '~/types'

interface Props {
  data: TranslationKey[]
  pagination?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pagination: false
})

// Business-specific column definitions
const translationColumns: Column[] = [
  {
    key: 'key',
    label: 'Key',
    width: '30%',
    align: 'left'
  },
  {
    key: 'translation',
    label: 'Translation', 
    width: '50%',
    align: 'left'
  },
  {
    key: 'updatedAt',
    label: 'Updated At',
    width: '20%',
    align: 'right'
  }
]

// Business-specific data mapping
const tableData = computed(() => 
  props.data.map(item => ({
    key: item.key,
    translation: item.translation,
    updatedAt: item.updatedAt
  }))
)
</script>

<template>
  <Table 
    :columns="translationColumns"
    :data="tableData"
    row-key="key"
    :pagination="pagination"
  >
    <table class="data-table" role="table">
      <TableHeader />
      <TableBody>
        <!-- Business-specific cell rendering -->
        <template #cell-key="{ value }">
          <span class="key-text">{{ value }}</span>
        </template>
        
        <template #cell-translation="{ value }">
          <div class="translation-content">
            <span class="flag-icon">🇬🇧</span>
            <span class="translation-text">{{ value }}</span>
          </div>
        </template>
        
        <template #cell-updatedAt="{ value }">
          <span class="date-text">{{ value }}</span>
        </template>
      </TableBody>
    </table>
    <TablePagination />
  </Table>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.key-text {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: vars.$font-size-sm;
  color: vars.$color-text-primary;
  @include mix.text-truncate;
  display: block;
}

.translation-content {
  @include mix.flex-center;
  gap: vars.$spacing-sm;
  justify-content: flex-start;
  
  .flag-icon {
    font-size: vars.$font-size-sm;
  }
  
  .translation-text {
    color: vars.$color-text-primary;
    @include mix.text-truncate;
  }
}

.date-text {
  font-size: vars.$font-size-sm;
  color: vars.$color-text-secondary;
  display: block;
}

// Ensure table takes full width
:deep(.data-table) {
  width: 100%;
  table-layout: fixed;
}
</style> 