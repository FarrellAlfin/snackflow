<template>
  <div class="px-4 py-6 max-w-2xl mx-auto">

    <!-- Greeting -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">
        Good {{ greeting }}, {{ firstName }} 👋
      </h2>
      <p class="text-sm text-gray-500 mt-0.5">{{ today }}</p>
    </div>

    <!-- Quick stats -->
    <div class="grid grid-cols-2 gap-3 mb-6">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        :icon="stat.icon"
        :label="stat.label"
        :value="stat.value"
        :color="stat.color"
      />
    </div>

    <!-- Modules -->
    <div class="mb-4">
      <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Modules</h3>
      <div class="grid grid-cols-2 gap-3">
        <RouterLink
          v-for="mod in modules"
          :key="mod.to"
          :to="mod.to"
          class="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 active:scale-95 transition-all duration-150"
        >
          <div :class="`w-12 h-12 rounded-xl flex items-center justify-center ${mod.bg}`">
            <i :class="`${mod.icon} text-xl ${mod.iconColor}`"></i>
          </div>
          <span class="text-xs font-semibold text-gray-700 text-center leading-tight">{{ mod.label }}</span>
        </RouterLink>
      </div>
    </div>

    <!-- Recent activity placeholder -->
    <div class="mt-6">
      <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent Activity</h3>
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        <div
          v-for="item in recentActivity"
          :key="item.id"
          class="flex items-start gap-3 px-4 py-3"
        >
          <div :class="`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${item.bg}`">
            <i :class="`${item.icon} text-xs ${item.iconColor}`"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-800 font-medium">{{ item.title }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ item.time }}</p>
          </div>
        </div>

        <div v-if="recentActivity.length === 0" class="px-4 py-8 text-center">
          <i class="pi pi-inbox text-gray-300 text-3xl"></i>
          <p class="text-sm text-gray-400 mt-2">No recent activity</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import StatCard from '@/components/StatCard.vue'

const auth = useAuthStore()

const firstName = computed(() => auth.user?.name?.split(' ')[0] || 'there')

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
})

const today = computed(() =>
  new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
)

const stats = [
  { label: 'Production Today', value: '—', icon: 'pi pi-box', color: 'orange' },
  { label: 'Staff On Duty', value: '—', icon: 'pi pi-users', color: 'blue' },
  { label: 'Machines Active', value: '—', icon: 'pi pi-cog', color: 'green' },
  { label: 'Energy (kWh)', value: '—', icon: 'pi pi-bolt', color: 'yellow' },
]

const modules = [
  { label: 'Raw Materials', to: '/raw-materials', icon: 'pi pi-box', bg: 'bg-orange-100', iconColor: 'text-orange-500' },
  { label: 'Human Resources', to: '/hr', icon: 'pi pi-users', bg: 'bg-blue-100', iconColor: 'text-blue-500' },
  { label: 'Machines', to: '/machines', icon: 'pi pi-cog', bg: 'bg-green-100', iconColor: 'text-green-500' },
  { label: 'Energy', to: '/energy', icon: 'pi pi-bolt', bg: 'bg-yellow-100', iconColor: 'text-yellow-500' },
  { label: 'Reports', to: '/reports', icon: 'pi pi-chart-bar', bg: 'bg-purple-100', iconColor: 'text-purple-500' },
  { label: 'User Mgmt', to: '/admin/users', icon: 'pi pi-shield', bg: 'bg-red-100', iconColor: 'text-red-500' },
]

const recentActivity = [
  { id: 1, title: 'Raw material stock updated', time: '10 minutes ago', icon: 'pi pi-box', bg: 'bg-orange-100', iconColor: 'text-orange-500' },
  { id: 2, title: 'Machine #3 log recorded', time: '42 minutes ago', icon: 'pi pi-cog', bg: 'bg-green-100', iconColor: 'text-green-500' },
  { id: 3, title: 'New user added', time: '2 hours ago', icon: 'pi pi-user-plus', bg: 'bg-blue-100', iconColor: 'text-blue-500' },
]
</script>
