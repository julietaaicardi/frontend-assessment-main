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
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as vars;
@use '~/assets/scss/mixins' as mix;

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: vars.$color-background;
  border-bottom: 1px solid vars.$color-border;
  padding: vars.$spacing-md vars.$spacing-lg;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  background-color: rgba(vars.$color-background, 0.95);
}

.header-content {
  @include mix.flex-between;
  gap: vars.$spacing-md;
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
  gap: vars.$spacing-lg;

  .nav-placeholder {
    color: vars.$color-text-secondary;
    font-size: vars.$font-size-sm;
    font-style: italic;
  }
}

.main {
  flex: 1;
  padding: vars.$spacing-xl vars.$spacing-lg;
  width: 100%;
}

// Responsive adjustments
@include mix.respond-to(sm) {
  .header-content {
    gap: vars.$spacing-lg;
  }

  .nav {
    gap: vars.$spacing-xl;
  }
}

@include mix.respond-to(md) {
  .app-header {
    padding: vars.$spacing-lg vars.$spacing-xl;
  }

  .main {
    padding: vars.$spacing-2xl vars.$spacing-xl;
  }
}
</style>
