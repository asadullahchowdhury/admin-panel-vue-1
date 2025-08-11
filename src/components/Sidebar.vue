<template>
  <!-- Sidebar overlay for mobile -->
  <div v-if="sidebarOpen && window?.innerWidth < 1024" @click="handleCloseSidebar" class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity duration-300"></div>

  <!-- Sidebar -->
  <aside :class="[
    'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  ]">
    <!-- Sidebar header -->
    <div class="flex items-center justify-between h-16 px-4 border-b border-gray-200">
      <h1 class="text-xl font-semibold text-gray-800">UpTask Admin</h1>

      <!-- Close button for mobile -->
      <button @click="handleCloseSidebar" class="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 transition-colors duration-200">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Navigation menu -->
    <nav class="mt-6 px-4">
      <div class="space-y-2">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.href"
          :class="[
            'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
            $route.path === item.href
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          ]"
          @click="handleNavigationClick"
        >
          <!-- Dashboard Icon -->
          <svg v-if="item.name === 'Dashboard'" class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <!-- Users Icon -->
          <svg v-else-if="item.name === 'Users'" class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
          <!-- Categories Icon -->
          <svg v-else-if="item.name === 'Categories'" class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
          </svg>
          {{ item.name }}
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script>
/**
 * Sidebar Navigation Component
 * Provides navigation menu with responsive behavior
 */
export default {
  name: 'SidebarNavigation',
  props: {
    /**
     * Controls whether the sidebar is open or closed
     * @type {Boolean}
     */
    sidebarOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /**
       * Navigation menu items with their icons and routes
       * @type {Array}
       */
      navigationItems: [
        {
          name: 'Dashboard',
          href: '/',
          icon: 'HomeIcon'
        },
        {
          name: 'Users',
          href: '/users',
          icon: 'UsersIcon'
        },
        {
          name: 'Categories',
          href: '/categories',
          icon: 'FolderIcon'
        },
      ]
    }
  },
  methods: {
    /**
     * Handles sidebar close button click
     * Emits close-sidebar event to parent component
     */
    handleCloseSidebar() {
      this.$emit('close-sidebar')
    },
    /**
     * Handles navigation link clicks
     * Closes sidebar on mobile when a link is clicked
     */
    handleNavigationClick() {
      // Close sidebar on mobile when navigation link is clicked
      if (window?.innerWidth < 1024) {
        this.$emit('close-sidebar')
      }
    }
  }
}
</script>
