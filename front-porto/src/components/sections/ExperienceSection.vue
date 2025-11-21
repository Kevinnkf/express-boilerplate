<!-- src/components/sections/ExperienceSection.vue -->
<template>
  <div class="experiences-section">
    <h2 class="section-title">Experiences</h2>
    <!-- <p class="section-subtitle">Things I've built and worked on</p> -->
    
    <div v-if="loading" class="loading">Loading experiences...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="experiences-grid">
      <div 
        v-for="experience in experiences" 
        :key="experience.id" 
        class="experience-card"
      >
        <div class="experience-header">
          <h3 class="experience-title">{{ experience.company }}</h3>
          <div class="experience-links">
            <a v-if="experience.url" :href="experience.url" target="_blank" class="experience-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2"></path>
                <polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="2"></polyline>
                <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2"></line>
              </svg>
            </a>

          </div>
        </div>
        
        <p class="experience-description">{{ experience.description }}</p>
        
        <div v-if="experience.imageUrl" class="experience-image">
          <img :src="experience.imageUrl" :alt="experience.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { experiencesAPI } from '@/services/api'

export default {
  name: 'experiencesSection',
  setup() {
    const experiences = ref([])
    const loading = ref(false)
    const error = ref(null)

    const loadexperiences = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await experiencesAPI.getAll()
        experiences.value = response.data
        console.log('experiences loaded:', experiences.value)
      } catch (err) {
        error.value = 'Failed to load experiences'
        console.error('Error loading experiences:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadexperiences()    
    })

    return {
      experiences,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.experiences-section {
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

.experiences-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.experience-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
  transition: transform 0.3s, box-shadow 0.3s;
}

.experience-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.experience-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0;
}

.experience-links {
  display: flex;
  gap: 0.5rem;
}

.experience-link {
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
}

.experience-link:hover {
  background-color: var(--border);
  color: var(--accent);
}

.experience-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.experience-image {
  border-radius: 8px;
  overflow: hidden;
}

.experience-image img {
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