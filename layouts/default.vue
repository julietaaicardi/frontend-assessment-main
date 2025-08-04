<script lang="ts" setup>
// Layout metadata
useHead({
  title: 'Translation Keys Manager',
  meta: [
    {
      name: 'description',
      content:
        'Manage translation keys and their values across different locales',
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  htmlAttrs: {
    'data-theme': 'light',
  },
})
</script>

<template>
  <div class="layout">
    <Header class="app-header">
      <div class="header-content">
        <div class="logo">
          <img
            src="~/assets/images/logo_small.svg"
            alt="Altura Logo"
            class="logo-image"
          />
        </div>
      </div>
    </Header>

    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/abstracts' as *;
@use '~/assets/scss/mixins' as mix;

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: $color-background;
  border-bottom: 1px solid $color-border;
  padding: $spacing-md $spacing-lg;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  background-color: rgba($color-background, 0.95);
}

.header-content {
  @include mix.flex-between;
  gap: $spacing-md;
  width: 100%;
}

.logo {
  @include mix.flex-center;

  .logo-image {
    height: 2rem;
    width: auto;
  }
}

.nav {
  @include mix.flex-center;
  gap: $spacing-lg;

  .nav-placeholder {
    color: $color-text-secondary;
    font-size: $font-size-sm;
    font-style: italic;
  }
}

.main {
  flex: 1;
  padding: $spacing-xl $spacing-lg;
  width: 100%;
}

// Responsive adjustments
@include mix.respond-to(sm) {
  .header-content {
    gap: $spacing-lg;
  }

  .nav {
    gap: $spacing-xl;
  }
}

@include mix.respond-to(md) {
  .app-header {
    padding: $spacing-lg $spacing-xl;
  }

  .main {
    padding: $spacing-2xl $spacing-xl;
  }
}
</style>
