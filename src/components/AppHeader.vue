<template>
  <header class="fixed top-0 inset-x-0 z-40 bg-white border-b border-gray-100 shadow-sm">
    <div class="flex items-center justify-between h-14 px-4">

      <!-- Left: hamburger + dropdown menu -->
      <div class="relative" ref="menuRef">
        <button
          @click="menuOpen = !menuOpen"
          class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="Open menu"
        >
          <i :class="menuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-gray-600 text-lg"></i>
        </button>

        <!-- Dropdown -->
        <Transition
          enter-active-class="transition ease-out duration-150"
          enter-from-class="opacity-0 scale-95 -translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-1"
        >
          <div
            v-if="menuOpen"
            class="absolute left-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden"
          >
            <!-- App name in dropdown -->
            <div class="px-4 py-2 mb-1">
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation</p>
            </div>

            <nav>
              <RouterLink
                v-for="item in menuItems"
                :key="item.to"
                :to="item.to"
                @click="menuOpen = false"
                class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                active-class="bg-orange-50 text-orange-600 font-medium"
              >
                <i :class="item.icon" class="text-base w-5 text-center"></i>
                <span>{{ item.label }}</span>
                <span
                  v-if="item.badge"
                  class="ml-auto text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-medium"
                >{{ item.badge }}</span>
              </RouterLink>
            </nav>

            <div class="my-2 border-t border-gray-100"></div>

            <!-- Logout -->
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <i class="pi pi-sign-out text-base w-5 text-center"></i>
              <span>Sign out</span>
            </button>
          </div>
        </Transition>
      </div>

      <!-- Center: page title -->
      <div class="flex-1 text-center px-2">
        <h1 class="text-base font-semibold text-gray-900 truncate">{{ pageTitle }}</h1>
      </div>

      <!-- Right: user profile icon -->
      <div class="relative" ref="profileRef">
        <button
          @click="profileOpen = !profileOpen"
          class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="User profile"
        >
          <img
            v-if="auth.user?.picture"
            :src="auth.user.picture"
            :alt="auth.user.name"
            class="w-8 h-8 rounded-full object-cover ring-2 ring-orange-200"
          />
          <div
            v-else
            class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center ring-2 ring-orange-200"
          >
            <span class="text-sm font-semibold text-orange-600">{{ initials }}</span>
          </div>
        </button>

        <!-- Profile dropdown -->
        <Transition
          enter-active-class="transition ease-out duration-150"
          enter-from-class="opacity-0 scale-95 translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-1"
        >
          <div
            v-if="profileOpen"
            class="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <!-- User info -->
            <div class="px-4 py-3 border-b border-gray-100">
              <p class="text-sm font-semibold text-gray-900 truncate">{{ auth.user?.name }}</p>
              <p class="text-xs text-gray-500 truncate">{{ auth.user?.email }}</p>
              <span class="inline-block mt-1.5 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium capitalize">
                {{ auth.user?.role }}
              </span>
            </div>

            <button
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <i class="pi pi-sign-out text-base"></i>
              <span>Sign out</span>
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  title: { type: String, default: '' },
})

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const menuOpen = ref(false)
const profileOpen = ref(false)
const menuRef = ref(null)
const profileRef = ref(null)

const pageTitle = computed(() => props.title || route.meta.title || 'SnackFlow')

const initials = computed(() => {
  const name = auth.user?.name || ''
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
})

const menuItems = [
  { label: 'Dashboard', to: '/', icon: 'pi pi-home' },
  { label: 'Raw Materials', to: '/raw-materials', icon: 'pi pi-box' },
  { label: 'Human Resources', to: '/hr', icon: 'pi pi-users' },
  { label: 'Machines', to: '/machines', icon: 'pi pi-cog' },
  { label: 'Energy', to: '/energy', icon: 'pi pi-bolt' },
  { label: 'Reports', to: '/reports', icon: 'pi pi-chart-bar' },
  { label: 'User Management', to: '/admin/users', icon: 'pi pi-shield', badge: 'Admin' },
]

function handleLogout() {
  menuOpen.value = false
  profileOpen.value = false
  auth.logout()
  router.push({ name: 'Login' })
}

function onClickOutside(event) {
  if (menuRef.value && !menuRef.value.contains(event.target)) menuOpen.value = false
  if (profileRef.value && !profileRef.value.contains(event.target)) profileOpen.value = false
}

onMounted(() => document.addEventListener('click', onClickOutside, true))
onUnmounted(() => document.removeEventListener('click', onClickOutside, true))
</script>
