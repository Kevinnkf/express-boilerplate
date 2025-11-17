<!-- src/App.vue -->
<template>
  <div id="app" :class="{ 'dark-mode': darkMode }">
    <div class="app-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <SidebarContent :darkMode="darkMode" @toggle-dark-mode="toggleDarkMode" />
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        
        <!-- <section id="about" class="section">
          <AboutSection />
        </section> -->
        
        <!-- <section id="experience" class="section">
          <ExperienceSection />
        </section> -->
        
        <section id="projects" class="section">
          <ProjectsSection />
        </section>

        <!-- <section id="skills" class="section">
          <SkillsSection />
        </section> -->

        <!-- <section id="contact" class="section">
          <ContactSection />
        </section> -->
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SidebarContent from '@/components/layout/SidebarContent.vue'
// import AboutSection from '@/components/sections/AboutSection.vue'
// import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsSection from '@/components/sections/ProjectSection.vue'
// import SkillsSection from '@/components/sections/SkillsSection.vue'
// import ContactSection from '@/components/sections/ContactSection.vue'

export default {
  name: 'App',
  components: {
    SidebarContent,
    // AboutSection,
    // ExperienceSection,
    ProjectsSection,
    // SkillsSection,
    // ContactSection
  },
  setup() {
    const darkMode = ref(false)

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value
    }

    return {
      darkMode,
      toggleDarkMode
    }
  }
}
</script>

<style>
:root {
  /* Light theme */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --accent: #3182ce;
  --border: #e2e8f0;
  --sidebar-bg: #f7fafc;
}

.dark-mode {
  /* Dark theme */
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --accent: #63b3ed;
  --border: #4a5568;
  --sidebar-bg: #2d3748;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

/* Sidebar - 35% of screen */
.sidebar {
  width: 35%;
  max-width: 500px;
  min-width: 350px;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  padding: 2rem;
}

/* Main Content - 65% of screen */
.main-content {
  flex: 1;
  margin-left: 35%;
  padding: 2rem;
}

.section {
  padding: 4rem 0;
  max-width: 800px;
}

.section:not(:last-child) {
  border-bottom: 1px solid var(--border);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    width: 40%;
    min-width: 300px;
  }
  
  .main-content {
    margin-left: 40%;
  }
}

@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }
  
  .sidebar {
    position: static;
    width: 100%;
    max-width: none;
    min-width: auto;
    height: auto;
  }
  
  .main-content {
    margin-left: 0;
  }
}
</style>