<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col items-center justify-center px-4">

    <!-- Brand mark -->
    <div class="mb-8 flex flex-col items-center gap-3">
      <div class="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg">
        <i class="pi pi-box text-white text-3xl"></i>
      </div>
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">SnackFlow</h1>
        <p class="text-sm text-gray-500 mt-0.5">Production Management System</p>
      </div>
    </div>

    <!-- Login card -->
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div class="px-8 pt-8 pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Welcome back</h2>
        <p class="text-sm text-gray-500 mt-1">Sign in to access the production dashboard</p>
      </div>

      <form @submit.prevent="login" class="px-8 py-6 flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-gray-600">Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Your name"
            class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-gray-600">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold rounded-xl transition-colors duration-150 shadow-sm mt-1"
        >
          <i class="pi pi-sign-in"></i>
          Enter Dashboard
        </button>
      </form>
    </div>

    <p class="mt-8 text-xs text-gray-400">© {{ year }} SnackFlow. Internal use only.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({ name: '', email: '' })
const year = computed(() => new Date().getFullYear())

function login() {
  auth.loginDirect(form.value.name || 'User', form.value.email || 'user@snackflow.local')
  router.push({ name: 'Home' })
}
</script>
