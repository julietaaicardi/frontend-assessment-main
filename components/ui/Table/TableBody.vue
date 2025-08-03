<script lang="ts" setup>
import type { Row } from "~/types/ui/table";

// Inject table context
const tableContext = inject("tableContext") as any;

if (!tableContext) {
  throw new Error("TableBody must be used within a Table component");
}

const { data, loading, emptyMessage, columns, rowKey } = tableContext;

// Check if data is empty - data is now a computed ref
const isEmpty = computed(
  () => !loading.value && (!data.value || data.value.length === 0)
);
</script>

<template>
  <tbody>
    <!-- Loading state -->
    <TableLoading v-if="loading" />

    <!-- Empty state -->
    <TableEmptyState v-else-if="isEmpty" :message="emptyMessage" />

    <!-- Data rows -->
    <slot v-else>
      <TableRow
        v-for="(row, index) in data"
        :key="row[rowKey] || index"
        :row="row"
        :row-index="index"
      >
        <TableCell
          v-for="column in columns"
          :key="column.key"
          :column="column"
          :row="row"
          :value="row[column.key]"
        >
          <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps" />
          </template>
        </TableCell>
      </TableRow>
    </slot>
  </tbody>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

tbody {
  // Styles will be handled by individual row and cell components
}
</style>
