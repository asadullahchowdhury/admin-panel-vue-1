<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar Component -->
    <SidebarNavigation
      :sidebar-open="sidebarOpen"
      @close-sidebar="closeSidebar"
    />

    <!-- Main content area -->
    <div class="flex-1 flex flex-col transition-all duration-300">
      <!-- Fixed Header Component -->
      <Header
        :page-title="pageTitle"
        @toggle-sidebar="openSidebar"
      />

      <!-- Scrollable Page content -->
      <main class="flex-1 overflow-y-auto py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import SidebarNavigation from './Sidebar.vue'
import Header from './Header.vue'

export default {
  name: 'AppLayout',
  components: {
    SidebarNavigation,
    Header
  },
  data() {
    return {
      sidebarOpen: false
    }
  },
  computed: {
    /**
     * Computes the current page title based on the active route
     * @returns {string} The current page title
     */
    pageTitle() {
      const navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Users', href: '/users' },
        { name: 'Categories', href: '/categories' },
        { name: 'Profile', href: '/profile' }
      ]
      const currentRoute = navigation.find(item => item.href === this.$route.path)
      return currentRoute ? currentRoute.name : 'Dashboard'
    }
  },
  mounted() {
    // Initialize sidebar state based on window width
    this.initializeSidebar()

    // Add resize event listener
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    // Remove resize event listener to prevent memory leaks
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    /**
     * Initializes the sidebar state based on screen size
     */
    initializeSidebar() {
      this.sidebarOpen = window?.innerWidth >= 1024
    },

    /**
     * Handles window resize events to update sidebar state
     */
    handleResize() {
      this.sidebarOpen = window?.innerWidth >= 1024
    },

    /**
     * Opens the sidebar (used for mobile toggle)
     */
    openSidebar() {
      this.sidebarOpen = true
    },

    /**
     * Closes the sidebar (used for mobile close)
     */
    closeSidebar() {
      this.sidebarOpen = false
    }
  }
}
</script>
