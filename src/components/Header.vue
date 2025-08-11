<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center">
        <button @click="$emit('toggle-sidebar')" class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h2 class="ml-2 lg:ml-0 text-lg font-medium text-gray-900">{{ pageTitle }}</h2>
      </div>
      
      <!-- Profile dropdown -->
      <div class="relative">
        <button @click="toggleProfileDropdown" class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <span class="text-sm font-medium text-white">{{ userInitials }}</span>
          </div>
          <div class="hidden md:block text-left">
            <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
            <p class="text-xs text-gray-500">{{ user.email }}</p>
          </div>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        <!-- Dropdown menu -->
        <div v-if="profileDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <router-link to="/profile" class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <svg class="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Profile
          </router-link>
          <button @click="handleLogout" class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <svg class="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Sign out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    /**
     * The title to display in the header
     * @type {String}
     */
    pageTitle: {
      type: String,
      default: 'Dashboard'
    }
  },
  data() {
    return {
      /**
       * Controls the visibility of the profile dropdown
       * @type {Boolean}
       */
      profileDropdownOpen: false
    }
  },
  computed: {
    /**
     * Gets user data from localStorage or returns default values
     * @returns {Object} User object with name and email
     */
    user() {
      const userData = localStorage.getItem('user')
      return userData ? JSON.parse(userData) : { name: 'User', email: 'user@example.com' }
    },

    /**
     * Generates user initials from the user's name
     * @returns {String} User initials (e.g., "JD" for "John Doe")
     */
    userInitials() {
      return this.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    /**
     * Handles clicks outside the profile dropdown to close it
     * @param {Event} e - The click event
     */
    handleClickOutside(e) {
      if (!e.target.closest('.relative')) {
        this.profileDropdownOpen = false
      }
    },

    /**
     * Toggles the profile dropdown visibility
     */
    toggleProfileDropdown() {
      this.profileDropdownOpen = !this.profileDropdownOpen
    },

    /**
     * Handles user logout by clearing localStorage and redirecting to login
     */
    handleLogout() {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      localStorage.removeItem('rememberMe')
      this.$router.push('/login')
    }
  },
  emits: ['toggle-sidebar']
}
</script>
