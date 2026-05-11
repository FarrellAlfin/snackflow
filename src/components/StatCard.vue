<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
    <div :class="`w-8 h-8 rounded-lg flex items-center justify-center ${bgClass}`">
      <i :class="`${icon} text-sm ${iconClass}`"></i>
    </div>
    <div>
      <p class="text-lg font-bold text-gray-900 leading-tight">{{ value }}</p>
      <p class="text-xs text-gray-500 leading-tight">{{ label }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: String,
  label: String,
  value: [String, Number],
  color: { type: String, default: 'orange' },
})

const colorMap = {
  orange: { bg: 'bg-orange-100', icon: 'text-orange-500' },
  blue:   { bg: 'bg-blue-100',   icon: 'text-blue-500'   },
  green:  { bg: 'bg-green-100',  icon: 'text-green-500'  },
  yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-500' },
  purple: { bg: 'bg-purple-100', icon: 'text-purple-500' },
}

const bgClass = computed(() => colorMap[props.color]?.bg || colorMap.orange.bg)
const iconClass = computed(() => colorMap[props.color]?.icon || colorMap.orange.icon)
</script>
