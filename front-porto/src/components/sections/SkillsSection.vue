<!-- src/components/sections/skillsSection.vue -->
<template>
  <div class="skills-section">
    <h2 class="section-title">Skills</h2>
    <p class="section-subtitle"></p>
    
    <div v-if="loading" class="loading">Loading skills...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="skills-grid">
      <div 
        v-for="skill in skills" 
        :key="skill.id" 
        class="skill-card"
      >
        <div class="skill-header">
          <h3 class="skill-title">{{ skill.name }}</h3>
          <div class="skill-links">
            <a v-if="skill.url" :href="skill.url" target="_blank" class="skill-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2"></path>
                <polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="2"></polyline>
                <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2"></line>
              </svg>
            </a>
          </div>
        </div>
        
        <p class="skill-description">{{ skill.description }}</p>
        
        <div v-if="skill.imageUrl" class="skill-image">
          <img :src="skill.imageUrl" :alt="skill.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { skillsAPI } from '@/services/api'

export default {
  name: 'skillsSection',
  setup() {
    const skills = ref([])
    const loading = ref(false)
    const error = ref(null)

    const loadskills = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await skillsAPI.getAll()
        skills.value = response.data
        console.log('skills loaded:', skills.value)
      } catch (err) {
        error.value = 'Failed to load skills'
        console.error('Error loading skills:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadskills()    
    })

    return {
      skills,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.skills-section {
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

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skill-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
  transition: transform 0.3s, box-shadow 0.3s;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.skill-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0;
}

.skill-links {
  display: flex;
  gap: 0.5rem;
}

.skill-link {
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
}

.skill-link:hover {
  background-color: var(--border);
  color: var(--accent);
}

.skill-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.skill-image {
  border-radius: 8px;
  overflow: hidden;
}

.skill-image img {
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