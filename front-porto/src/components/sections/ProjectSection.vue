<!-- src/components/sections/ProjectsSection.vue -->
<template>
  <div class="projects-section">
    <h2 class="section-title">Projects</h2>
    <p class="section-subtitle">Things I've built and worked on</p>
    
    <div v-if="loading" class="loading">Loading projects...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="projects-grid">
      <div 
        v-for="project in projects" 
        :key="project.id" 
        class="project-card"
      >
        <div class="project-header">
          <h3 class="project-title">{{ project.name }}</h3>
          <div class="project-links">
            <a v-if="project.url" :href="project.url" target="_blank" class="project-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2"></path>
                <polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="2"></polyline>
                <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2"></line>
              </svg>
            </a>
          </div>
        </div>
        
        <p class="project-description">{{ project.description }}</p>
        
        <div v-if="project.imageUrl" class="project-image">
          <img :src="project.imageUrl" :alt="project.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { projectsAPI } from '@/services/api'

export default {
  name: 'ProjectsSection',
  setup() {
    const projects = ref([])
    const loading = ref(false)
    const error = ref(null)

    const loadProjects = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await projectsAPI.getAll()
        projects.value = response.data
      } catch (err) {
        error.value = 'Failed to load projects'
        console.error('Error loading projects:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadProjects()    
    })

    return {
      projects,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.projects-section {
  max-width: 100%;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
  transition: transform 0.3s, box-shadow 0.3s;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0;
}

.project-links {
  display: flex;
  gap: 0.5rem;
}

.project-link {
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
}

.project-link:hover {
  background-color: var(--border);
  color: var(--accent);
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-image {
  border-radius: 8px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.125rem;
}

.error {
  color: #e53e3e;
}
</style>