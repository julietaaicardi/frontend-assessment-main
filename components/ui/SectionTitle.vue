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
@use '~/assets/scss/abstracts' as *;

.section-title {
  .section-title-text {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin: 0;
  }
}
</style>
