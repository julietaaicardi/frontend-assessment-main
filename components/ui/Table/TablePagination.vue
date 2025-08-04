<script lang="ts" setup>
import type { TableContext } from './types'

// Inject table context
const tableContext = inject<TableContext>('tableContext')

if (!tableContext) {
  throw new Error('TablePagination must be used within a Table component')
}

const { 
  pagination, 
  currentPage, 
  totalPages, 
  startIndex, 
  endIndex, 
  totalItems,
  handlePrevPage,
  handleNextPage
} = tableContext

const isPrevDisabled = computed(() => !tableContext.hasPrevious)
const isNextDisabled = computed(() => !tableContext.hasNext)
</script>

<template>
  <footer v-if="pagination" class="table-pagination">
    <div class="pagination-info">
      <span class="pagination-text">
        Page {{ currentPage }} of {{ totalPages }} ({{ startIndex }} - {{ endIndex }} keys)
      </span>
    </div>
    <div v-if="totalPages > 1" class="pagination-controls">
      <Button 
        label="‹"
        variant="ghost"
        size="sm"
        aria-label="Previous page" 
        :disabled="isPrevDisabled"
        @click="handlePrevPage"
      />
      <Button 
        label="›"
        variant="ghost"
        size="sm"
        aria-label="Next page"
        :disabled="isNextDisabled"
        @click="handleNextPage"
      />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.table-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: vars.$spacing-lg;
  padding: vars.$spacing-lg;
  border-top: 1px solid vars.$color-border;
  
  .pagination-info {
    .pagination-text {
      font-size: vars.$font-size-sm;
      color: vars.$color-text-secondary;
    }
  }
  
  .pagination-controls {
    @include mix.flex-center;
    gap: vars.$spacing-sm;
  }
}
</style> 