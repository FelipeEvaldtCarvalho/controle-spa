<script setup lang="ts">
definePageMeta({
  middleware: ["to-login"],
});
</script>
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <NuxtPage />
  </div>
</template>
