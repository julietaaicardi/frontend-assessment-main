<script lang="ts" setup>
import type { DirectusTranslation } from '~/types/domain/translation'
import { formatTranslationWithFlag } from '../utils/language'
import Overlay from '~/components/ui/Overlay.vue'

interface Props {
  translation: DirectusTranslation
  position?: 'top' | 'bottom' | 'left' | 'right'
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  width: 'md',
})

// Get all translations for this key
const allTranslations = computed(() => {
  return props.translation.translations || []
})
</script>

<template>
  <Overlay :position="position" :width="width" trigger="hover" role="tooltip">
    <template #trigger>
      <slot name="trigger" />
    </template>

    <div v-if="allTranslations.length > 0" class="translation-tooltip">
      <div
        v-for="translation in allTranslations"
        :key="`${translation.languages_code}-${translation.value}`"
        class="translation-item"
      >
        <span class="translation-text">
          {{
            formatTranslationWithFlag(
              translation.value,
              translation.languages_code
            )
          }}
        </span>
      </div>
    </div>

    <div v-else class="translation-tooltip">
      <div class="no-translations">
        <span class="no-translations-text">No translations available</span>
      </div>
    </div>
  </Overlay>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;
@use '~/assets/scss/mixins' as mix;

.translation-tooltip {
  min-width: 200px;
  max-width: 300px;
}

.translation-item {
  display: flex;
  align-items: center;
  padding: $spacing-xs 0;
}

.translation-text {
  font-size: $font-size-sm;
  color: $color-text-primary;
  line-height: 1.4;
  word-break: break-word;
  flex: 1;
}

.no-translations {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-md;
}

.no-translations-text {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  font-style: italic;
}
</style>
