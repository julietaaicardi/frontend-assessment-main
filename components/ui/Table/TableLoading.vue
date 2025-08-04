<script lang="ts" setup>
interface Props {
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Loading...',
})
</script>

<template>
  <tr class="loading-row">
    <td colspan="100%" class="loading-cell">
      <div class="loading-content">
        <slot :message="message">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p class="loading-text">{{ message }}</p>
        </slot>
      </div>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;
@use '~/assets/scss/mixins' as mix;

.loading-row {
  .loading-cell {
    padding: calc(#{$spacing-xl} * 2);
    text-align: center;

    .loading-content {
      @include mix.flex-center;
      flex-direction: column;
      gap: $spacing-md;

      .loading-spinner {
        .spinner {
          width: 2rem;
          height: 2rem;
          border: 2px solid var(--shade-200);
          border-top: 2px solid $color-primary;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      }

      .loading-text {
        color: $color-text-secondary;
        font-size: $font-size-sm;
        margin: 0;
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
