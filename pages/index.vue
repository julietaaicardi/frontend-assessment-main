<script lang="ts" setup>
// Page metadata
useHead({
  title: "Translation Keys Manager",
  meta: [
    {
      name: "description",
      content: "Manage and view translation keys across different locales",
    },
  ],
});

import type { TranslationKey } from "~/types";

// Placeholder data for the table (will be replaced by Pinia)
const tableData: TranslationKey[] = [
  {
    key: "general.cancel",
    translation: "Cancel",
    updatedAt: "13 days ago",
  },
  {
    key: "general.accept",
    translation: "Accept",
    updatedAt: "14 days ago",
  },
  {
    key: "tender.name",
    translation: "Tender Name",
    updatedAt: "15 days ago",
  },
  {
    key: "tender.deadline",
    translation: "Deadline",
    updatedAt: "16 days ago",
  },
  {
    key: "user.profile",
    translation: "Profile",
    updatedAt: "17 days ago",
  },
];

// Placeholder state for filters
const searchValue = ref("");
const dateFrom = ref("Oct 17, 2021");
const dateTo = ref("Oct 17, 2021");
const pageSize = ref(10);

// Placeholder state for pagination
const currentPage = ref(1);
const totalPages = ref(52);
const totalKeys = ref(15000);

// Event handlers for filters
const handleSearchUpdate = (value: string) => {
  searchValue.value = value;
  // TODO: Implement search logic with Pinia
};

const handleDateFromUpdate = (value: string) => {
  dateFrom.value = value;
  // TODO: Implement date filter logic with Pinia
};

const handleDateToUpdate = (value: string) => {
  dateTo.value = value;
  // TODO: Implement date filter logic with Pinia
};

const handlePageSizeUpdate = (value: number) => {
  pageSize.value = value;
  // TODO: Implement page size logic with Pinia
};

// Event handlers for pagination
const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    // TODO: Fetch new data with Pinia
  }
};

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    // TODO: Fetch new data with Pinia
  }
};
</script>

<template>
  <div class="translation-keys-page">
    <!-- Header Filters -->
    <TranslationFilters
      :search-value="searchValue"
      :date-from="dateFrom"
      :date-to="dateTo"
      :page-size="pageSize"
      @update:search-value="handleSearchUpdate"
      @update:date-from="handleDateFromUpdate"
      @update:date-to="handleDateToUpdate"
      @update:page-size="handlePageSizeUpdate"
    />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Total Keys Display -->
      <SectionTitle :text="`${totalKeys.toLocaleString()} Keys`" />

      <!-- Translation Table -->
      <TranslationTable :data="tableData" :pagination="true" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.translation-keys-page {
  display: flex;
  flex-direction: column;
  gap: vars.$spacing-xl;
}

// Main Content
.main-content {
  display: flex;
  flex-direction: column;
  gap: vars.$spacing-lg;
}
</style>
