<template>
  <header class="header" v-bind="$attrs">
    <slot />
  </header>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: vars.$spacing-lg;
  flex-wrap: wrap;

  @media (max-width: vars.$breakpoint-sm - 1px) {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
