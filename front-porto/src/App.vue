<!-- src/App.vue -->
<template>
  <div id="app">
    <div class="flex min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <!-- Sidebar -->
      <aside class="w-[35%] max-w-[500px] min-w-[350px] bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed h-screen overflow-y-auto p-8 flex flex-col">
        <SidebarContent
          :darkMode="darkMode"
          :currentUser="currentUser"
          @toggle-dark-mode="toggleDarkMode"
          @open-login="showLogin = true"
          @logout="handleLogout"
        />
      </aside>

      <!-- Main Content -->
      <main class="flex-1 ml-[35%] p-8 text-gray-900 dark:text-gray-100">
        <section id="experience" class="py-16 max-w-3xl border-b border-gray-200 dark:border-gray-700">
          <ExperienceSection :currentUser="currentUser" />
        </section>

        <section id="projects" class="py-16 max-w-3xl border-b border-gray-200 dark:border-gray-700">
          <ProjectsSection :currentUser="currentUser" />
        </section>

        <section id="skills" class="py-16 max-w-3xl">
          <SkillsSection :currentUser="currentUser" />
        </section>
      </main>
    </div>

    <!-- Login Modal -->
    <LoginModal
      :show="showLogin"
      :darkMode="darkMode"
      @close="showLogin = false"
      @login-success="handleLoginSuccess"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import SidebarContent from '@/components/layout/SidebarContent.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsSection from '@/components/sections/ProjectSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import LoginModal from '@/components/LoginModal.vue'

export default {
  name: 'App',
  components: {
    SidebarContent,
    ExperienceSection,
    ProjectsSection,
    SkillsSection,
    LoginModal
  },
  setup() {
    const darkMode = ref(false)
    const showLogin = ref(false)
    const currentUser = ref(null)

    onMounted(() => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        currentUser.value = JSON.parse(storedUser)
      }
      // Apply persisted dark mode
      const savedDark = localStorage.getItem('darkMode')
      if (savedDark === 'true') {
        darkMode.value = true
        document.documentElement.classList.add('dark')
      }
    })

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value
      if (darkMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('darkMode', darkMode.value)
    }

    const handleLoginSuccess = (user) => {
      currentUser.value = user
      showLogin.value = false
    }

    const handleLogout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      currentUser.value = null
    }

    return {
      darkMode,
      toggleDarkMode,
      showLogin,
      currentUser,
      handleLoginSuccess,
      handleLogout
    }
  }
}
</script>