<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
        <p class="text-gray-600">Manage your account settings and preferences</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile information -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Personal Information -->
        <div class="card">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-900">Personal Information</h2>
            <button @click="editMode = !editMode" class="btn-secondary">
              {{ editMode ? 'Cancel' : 'Edit' }}
            </button>
          </div>
          
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  v-model="profile.firstName" 
                  type="text" 
                  class="input-field"
                  :disabled="!editMode"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  v-model="profile.lastName" 
                  type="text" 
                  class="input-field"
                  :disabled="!editMode"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                v-model="profile.email" 
                type="email" 
                class="input-field"
                :disabled="!editMode"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input 
                v-model="profile.phone" 
                type="tel" 
                class="input-field"
                :disabled="!editMode"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea 
                v-model="profile.bio" 
                rows="3" 
                class="input-field"
                :disabled="!editMode"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
            
            <div v-if="editMode" class="flex justify-end space-x-3">
              <button type="button" @click="editMode = false" class="btn-secondary">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <!-- Security Settings -->
        <div class="card">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button class="btn-secondary">Enable</button>
            </div>
            
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 class="text-sm font-medium text-gray-900">Change Password</h3>
                <p class="text-sm text-gray-500">Update your password regularly</p>
              </div>
              <button @click="showPasswordModal = true" class="btn-secondary">Change</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile sidebar -->
      <div class="space-y-6">
        <!-- Profile picture -->
        <div class="card text-center">
          <div class="flex justify-center mb-4">
            <div class="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold text-white">{{ userInitials }}</span>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">{{ profile.firstName }} {{ profile.lastName }}</h3>
          <p class="text-gray-500">{{ profile.email }}</p>
          <p class="text-sm text-gray-400 mt-2">Member since {{ memberSince }}</p>
        </div>

        <!-- Quick stats -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Last login</span>
              <span class="text-sm font-medium text-gray-900">{{ lastLogin }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Account status</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300" @click="showPasswordModal = false"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-300 ease-out sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
             :class="showPasswordModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Change Password</h3>
                <form @submit.prevent="changePassword" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input v-model="passwordForm.currentPassword" type="password" class="input-field" required>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input v-model="passwordForm.newPassword" type="password" class="input-field" required>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input v-model="passwordForm.confirmPassword" type="password" class="input-field" required>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="changePassword" class="btn-primary sm:ml-3 sm:w-auto">
              Change Password
            </button>
            <button @click="showPasswordModal = false" class="btn-secondary sm:mt-0 sm:w-auto">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      editMode: false,
      showPasswordModal: false,
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        bio: 'Full-stack developer with 5+ years of experience in web development. Passionate about creating user-friendly applications.'
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    userInitials() {
      return `${this.profile.firstName[0]}${this.profile.lastName[0]}`.toUpperCase()
    },
    memberSince() {
      return 'January 2023'
    },
    lastLogin() {
      return '2 hours ago'
    }
  },
  methods: {
    saveProfile() {
      // Simulate API call
      setTimeout(() => {
        this.editMode = false
        // Show success message
        alert('Profile updated successfully!')
      }, 1000)
    },
    changePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        alert('New passwords do not match!')
        return
      }
      
      // Simulate API call
      setTimeout(() => {
        this.showPasswordModal = false
        this.passwordForm = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
        alert('Password changed successfully!')
      }, 1000)
    }
  }
}
</script>
