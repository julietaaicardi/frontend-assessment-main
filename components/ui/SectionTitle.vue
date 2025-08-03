<script lang="ts" setup>
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <div class="section-title">
    <h1 class="section-title-text">{{ text }}</h1>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;

.section-title {
  .section-title-text {
    font-size: vars.$font-size-2xl;
    font-weight: vars.$font-weight-bold;
    color: vars.$color-text-primary;
    margin: 0;
  }
}
</style> 