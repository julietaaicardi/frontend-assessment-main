<template>
  <header class="header" v-bind="$attrs">
    <slot />
  </header>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-lg;
  flex-wrap: wrap;

  @media (max-width: $breakpoint-sm - 1px) {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
