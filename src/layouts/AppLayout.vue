<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <!-- Content shifted down by header height -->
    <main class="pt-14">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>
