<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        UpTask Admin
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Sign in to your account
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {{ error }}
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="form.email"
                class="input-field"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-300': errors.email }"
                placeholder="Enter your email"
              />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                v-model="form.password"
                class="input-field"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-300': errors.password }"
                placeholder="Enter your password"
              />
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="form.rememberMe"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Demo Credentials</span>
            </div>
          </div>
          <div class="mt-4 text-center text-sm text-gray-600">
            <p>Email: admin@uptask.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false
      },
      errors: {},
      error: '',
      loading: false
    }
  },
  methods: {
    validateForm() {
      this.errors = {}
      
      if (!this.form.email) {
        this.errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email'
      }
      
      if (!this.form.password) {
        this.errors.password = 'Password is required'
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
      }
      
      return Object.keys(this.errors).length === 0
    },
    
    async handleLogin() {
      if (!this.validateForm()) {
        return
      }
      
      this.loading = true
      this.error = ''
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Demo authentication
        if (this.form.email === 'admin@uptask.com' && this.form.password === 'admin123') {
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', JSON.stringify({
            id: 1,
            name: 'Admin User',
            email: this.form.email,
            role: 'admin'
          }))
          
          if (this.form.rememberMe) {
            localStorage.setItem('rememberMe', 'true')
          }
          
          this.$router.push('/dashboard')
        } else {
          this.error = 'Invalid email or password'
        }
      } catch (error) {
        this.error = 'An error occurred. Please try again.'
      } finally {
        this.loading = false
      }
    }
  },
  
  mounted() {
    // Auto-fill demo credentials
    this.form.email = 'admin@uptask.com'
    this.form.password = 'admin123'
  }
}
</script>
