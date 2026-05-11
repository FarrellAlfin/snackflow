import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('sf_user') || 'null'))
  const token = ref(localStorage.getItem('sf_token') || null)

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  function loginDirect(name, email) {
    user.value = {
      id: email,
      name,
      email,
      picture: null,
      role: 'viewer',
    }
    token.value = btoa(email)
    localStorage.setItem('sf_user', JSON.stringify(user.value))
    localStorage.setItem('sf_token', token.value)
  }

  function updateUser(updates) {
    user.value = { ...user.value, ...updates }
    localStorage.setItem('sf_user', JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('sf_user')
    localStorage.removeItem('sf_token')
  }

  return { user, token, isAuthenticated, loginDirect, updateUser, logout }
})
