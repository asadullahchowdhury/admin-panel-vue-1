<template>
  <div>
    <!-- Page header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Categories</h1>
          <p class="mt-2 text-sm text-gray-600">Manage your project categories</p>
        </div>
        <button @click="openModal()" class="btn-primary">
          Add Category
        </button>
      </div>
    </div>

    <!-- Search and filters -->
    <div class="card mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <label for="search" class="sr-only">Search categories</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              class="input-field pl-10"
              placeholder="Search categories by name..."
            />
          </div>
        </div>
        <div class="flex gap-2">
          <select v-model="statusFilter" class="input-field">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select v-model="typeFilter" class="input-field">
            <option value="">All Types</option>
            <option value="project">Project</option>
            <option value="task">Task</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Categories table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="category in paginatedCategories" :key="category.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center" :style="{ backgroundColor: category.color + '20' }">
                    <svg class="w-5 h-5" :style="{ color: category.color }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                    <div class="text-sm text-gray-500">{{ category.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getTypeBadgeClass(category.type)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ category.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(category.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ category.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ category.projectCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(category.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button @click="openModal(category)" class="text-primary-600 hover:text-primary-900">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="confirmDelete(category)" class="text-red-600 hover:text-red-900">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div v-if="filteredCategories.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
        <div class="mt-6">
          <button @click="openModal()" class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Category
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredCategories.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="previousPage" 
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            @click="nextPage" 
            :disabled="currentPage >= totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing 
              <span class="font-medium">{{ startIndex + 1 }}</span> 
              to 
              <span class="font-medium">{{ endIndex }}</span> 
              of 
              <span class="font-medium">{{ filteredCategories.length }}</span> 
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                @click="previousPage" 
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="goToPage(page)"
                :class="[
                  page === currentPage
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                ]"
              >
                {{ page }}
              </button>
              
              <button 
                @click="nextPage" 
                :disabled="currentPage >= totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Category Modal -->
    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300" @click="closeModal"></div>

          <Transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-300 ease-out sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveCategory">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {{ editingCategory ? 'Edit Category' : 'Add New Category' }}
                  </h3>

                  <div class="space-y-4">
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        id="name"
                        v-model="form.name"
                        type="text"
                        required
                        class="input-field mt-1"
                        placeholder="Enter category name"
                      />
                    </div>

                    <div>
                      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="description"
                        v-model="form.description"
                        rows="3"
                        class="input-field mt-1"
                        placeholder="Enter category description"
                      ></textarea>
                    </div>

                    <div>
                      <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
                      <select id="type" v-model="form.type" required class="input-field mt-1">
                        <option value="">Select type</option>
                        <option value="project">Project</option>
                        <option value="task">Task</option>
                        <option value="general">General</option>
                      </select>
                    </div>

                    <div>
                      <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                      <select id="status" v-model="form.status" required class="input-field mt-1">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label for="color" class="block text-sm font-medium text-gray-700">Color</label>
                      <div class="mt-1 flex items-center space-x-2">
                        <input
                          id="color"
                          v-model="form.color"
                          type="color"
                          class="h-10 w-20 rounded border border-gray-300"
                        />
                        <span class="text-sm text-gray-500">{{ form.color }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" class="btn-primary sm:ml-3 sm:w-auto">
                {{ editingCategory ? 'Update' : 'Create' }}
              </button>
              <button type="button" @click="closeModal" class="btn-secondary sm:w-auto">
                Cancel
              </button>
            </div>
          </form>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>

    <!-- Delete Confirmation Modal -->
    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300"></div>

          <Transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-300 ease-out sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Delete Category</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete <strong>{{ categoryToDelete?.name }}</strong>? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="deleteCategory" class="btn-danger sm:ml-3 sm:w-auto">
              Delete
            </button>
            <button @click="showDeleteModal = false" class="btn-secondary sm:w-auto">
              Cancel
            </button>
          </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'CategoriesPage',
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Development',
          description: 'Software development projects and tasks',
          type: 'project',
          status: 'active',
          color: '#3B82F6',
          projectCount: 15,
          createdAt: '2023-01-10'
        },
        {
          id: 2,
          name: 'Design',
          description: 'UI/UX design and creative work',
          type: 'project',
          status: 'active',
          color: '#10B981',
          projectCount: 8,
          createdAt: '2023-01-15'
        },
        {
          id: 3,
          name: 'Marketing',
          description: 'Marketing and promotional activities',
          type: 'general',
          status: 'active',
          color: '#F59E0B',
          projectCount: 12,
          createdAt: '2023-02-01'
        },
        {
          id: 4,
          name: 'Bug Fixes',
          description: 'Bug fixes and maintenance tasks',
          type: 'task',
          status: 'inactive',
          color: '#EF4444',
          projectCount: 5,
          createdAt: '2023-02-15'
        },
        {
          id: 5,
          name: 'Research',
          description: 'Research and analysis tasks',
          type: 'general',
          status: 'active',
          color: '#8B5CF6',
          projectCount: 3,
          createdAt: '2023-03-20'
        },
        {
          id: 6,
          name: 'Testing',
          description: 'Quality assurance and testing',
          type: 'task',
          status: 'active',
          color: '#06B6D4',
          projectCount: 7,
          createdAt: '2023-04-10'
        },
        {
          id: 7,
          name: 'Documentation',
          description: 'Documentation and guides',
          type: 'general',
          status: 'active',
          color: '#84CC16',
          projectCount: 4,
          createdAt: '2023-05-05'
        },
        {
          id: 8,
          name: 'Deployment',
          description: 'Deployment and infrastructure',
          type: 'project',
          status: 'active',
          color: '#F97316',
          projectCount: 2,
          createdAt: '2023-06-01'
        }
      ],
      searchQuery: '',
      statusFilter: '',
      typeFilter: '',
      showModal: false,
      showDeleteModal: false,
      editingCategory: null,
      categoryToDelete: null,
      form: {
        name: '',
        description: '',
        type: '',
        status: 'active',
        color: '#3B82F6'
      },
      /**
       * Current page number for pagination
       * @type {Number}
       */
      currentPage: 1,
      /**
       * Number of items per page
       * @type {Number}
       */
      itemsPerPage: 5
    }
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category => {
        const matchesSearch = !this.searchQuery ||
          category.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          category.description.toLowerCase().includes(this.searchQuery.toLowerCase())

        const matchesStatus = !this.statusFilter || category.status === this.statusFilter
        const matchesType = !this.typeFilter || category.type === this.typeFilter

        return matchesSearch && matchesStatus && matchesType
      })
    },

    /**
     * Calculates total number of pages
     * @returns {Number} Total pages
     */
    totalPages() {
      return Math.ceil(this.filteredCategories.length / this.itemsPerPage)
    },

    /**
     * Gets categories for current page
     * @returns {Array} Paginated categories array
     */
    paginatedCategories() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredCategories.slice(start, end)
    },

    /**
     * Calculates start index for pagination display
     * @returns {Number} Start index
     */
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage
    },

    /**
     * Calculates end index for pagination display
     * @returns {Number} End index
     */
    endIndex() {
      const end = this.startIndex + this.itemsPerPage
      return Math.min(end, this.filteredCategories.length)
    },

    /**
     * Gets visible page numbers for pagination
     * @returns {Array} Array of page numbers to display
     */
    visiblePages() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
      let end = Math.min(this.totalPages, start + maxVisible - 1)
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    }
  },
  watch: {
    /**
     * Watches for changes in filters and resets to first page
     */
    searchQuery() {
      this.currentPage = 1
    },
    statusFilter() {
      this.currentPage = 1
    },
    typeFilter() {
      this.currentPage = 1
    }
  },
  methods: {
    /**
     * Gets CSS classes for type badges
     * @param {String} type - Category type
     * @returns {String} CSS classes
     */
    getTypeBadgeClass(type) {
      const classes = {
        project: 'bg-blue-100 text-blue-800',
        task: 'bg-green-100 text-green-800',
        general: 'bg-purple-100 text-purple-800'
      }
      return classes[type] || 'bg-gray-100 text-gray-800'
    },

    /**
     * Gets CSS classes for status badges
     * @param {String} status - Category status
     * @returns {String} CSS classes
     */
    getStatusBadgeClass(status) {
      return status === 'active'
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-800'
    },

    /**
     * Formats date string to readable format
     * @param {String} dateString - Date string
     * @returns {String} Formatted date
     */
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },

    /**
     * Opens modal for creating or editing category
     * @param {Object|null} category - Category object to edit (null for new category)
     */
    openModal(category = null) {
      this.editingCategory = category
      if (category) {
        this.form = { ...category }
      } else {
        this.form = {
          name: '',
          description: '',
          type: '',
          status: 'active',
          color: '#3B82F6'
        }
      }
      this.showModal = true
    },

    /**
     * Closes modal and resets form
     */
    closeModal() {
      this.showModal = false
      this.editingCategory = null
      this.form = {
        name: '',
        description: '',
        type: '',
        status: 'active',
        color: '#3B82F6'
      }
    },

    /**
     * Saves category (creates new or updates existing)
     */
    saveCategory() {
      if (this.editingCategory) {
        // Update existing category
        const index = this.categories.findIndex(c => c.id === this.editingCategory.id)
        this.categories[index] = { ...this.editingCategory, ...this.form }
      } else {
        // Create new category
        const newCategory = {
          id: Date.now(),
          ...this.form,
          projectCount: 0,
          createdAt: new Date().toISOString().split('T')[0]
        }
        this.categories.push(newCategory)
      }
      this.closeModal()
    },

    /**
     * Opens delete confirmation modal
     * @param {Object} category - Category to delete
     */
    confirmDelete(category) {
      this.categoryToDelete = category
      this.showDeleteModal = true
    },

    /**
     * Deletes category from the list
     */
    deleteCategory() {
      const index = this.categories.findIndex(c => c.id === this.categoryToDelete.id)
      this.categories.splice(index, 1)
      this.showDeleteModal = false
      this.categoryToDelete = null
    },

    /**
     * Goes to previous page
     */
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },

    /**
     * Goes to next page
     */
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },

    /**
     * Goes to specific page
     * @param {Number} page - Page number to go to
     */
    goToPage(page) {
      this.currentPage = page
    }
  }
}
</script>
