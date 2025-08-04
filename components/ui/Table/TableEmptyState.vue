<script lang="ts" setup>
interface Props {
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: 'No data available',
})
</script>

<template>
  <tr class="empty-state-row">
    <td colspan="100%" class="empty-state-cell">
      <div class="empty-state-content">
        <slot :message="message">
          <div class="empty-state-icon">⚠️</div>
          <p class="empty-state-text">{{ message }}</p>
        </slot>
      </div>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;
@use '~/assets/scss/mixins' as mix;

.empty-state-row {
  .empty-state-cell {
    padding: calc(#{$spacing-xl} * 2);
    text-align: center;

    .empty-state-content {
      @include mix.flex-center;
      flex-direction: column;
      gap: $spacing-md;

      .empty-state-icon {
        font-size: 2rem;
        opacity: 0.5;
      }

      .empty-state-text {
        color: $color-text-secondary;
        font-size: $font-size-sm;
        margin: 0;
      }
    }
  }
}
</style>
