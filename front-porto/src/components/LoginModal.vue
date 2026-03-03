<!-- src/components/LoginModal.vue -->
<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click.self="$emit('close')"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

        <!-- Modal Header -->
        <div class="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ isLogin ? 'Welcome back' : 'Create account' }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ isLogin ? 'Login to manage your portfolio' : 'Register to get started' }}
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="px-8 py-6 flex flex-col gap-4">

          <div v-if="!isLogin" class="flex flex-col gap-1">
            <label for="name" class="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text" id="name" v-model="form.name" required
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              placeholder="Your full name"
            />
          </div>

          <div v-if="!isLogin" class="flex flex-col gap-1">
            <label for="username" class="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text" id="username" v-model="form.username" required
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              placeholder="Choose a username"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email" id="email" v-model="form.email" required
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="password" class="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password" id="password" v-model="form.password" required
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              placeholder="••••••••"
            />
          </div>

          <!-- Error -->
          <div v-if="error" class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg px-3 py-2">
            {{ error }}
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ loading ? 'Processing...' : (isLogin ? 'Login' : 'Register') }}
          </button>
        </form>

        <!-- Footer -->
        <div class="px-8 pb-8 flex flex-col gap-3">
          <button
            @click.prevent="isLogin = !isLogin"
            class="text-sm text-blue-600 dark:text-blue-400 hover:underline mx-auto"
          >
            {{ isLogin ? "Don't have an account? Register" : "Already have an account? Login" }}
          </button>
          <button
            @click="$emit('close')"
            class="w-full py-2 text-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script>
import { ref, reactive } from 'vue'
import api from '../services/api'

export default {
  name: 'LoginModal',
  props: {
    show: Boolean,
    darkMode: Boolean
  },
  emits: ['close', 'login-success'],
  setup(props, { emit }) {
    const isLogin = ref(true)
    const loading = ref(false)
    const error = ref('')
    const form = reactive({
      name: '',
      username: '',
      email: '',
      password: ''
    })

    const handleSubmit = async () => {
      loading.value = true
      error.value = ''
      try {
        if (isLogin.value) {
          const res = await api.post('/auth/login', {
            email: form.email,
            password: form.password
          })
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          emit('login-success', res.data.user)
          emit('close')
        } else {
          await api.post('/user/register', {
            name: form.name,
            username: form.username,
            email: form.email,
            password: form.password
          })
          const res = await api.post('/auth/login', {
            email: form.email,
            password: form.password
          })
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          emit('login-success', res.data.user)
          emit('close')
        }
      } catch (err) {
        error.value = err.response?.data?.message || 'An error occurred'
      } finally {
        loading.value = false
      }
    }

    return { isLogin, form, loading, error, handleSubmit }
  }
}
</script>
