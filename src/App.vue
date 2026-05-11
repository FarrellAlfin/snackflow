<template>
  <RouterView />
  <Toast position="top-center" />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
</script>
