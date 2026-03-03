<!-- src/components/sections/SkillsSection.vue -->
<template>
  <div>
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Skills</h2>
      <button
        v-if="currentUser"
        class="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
      >
        + Add Skill
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12 text-gray-500 dark:text-gray-400 text-lg">
      Loading skills...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-12 text-red-500 text-lg">{{ error }}</div>

    <!-- Grid -->
    <div v-else class="flex flex-col gap-6">
      <div
        v-for="skill in skills"
        :key="skill.id"
        class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
      >
        <!-- Card Header -->
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ skill.name }}</h3>
          <div class="flex items-center gap-2">
            <template v-if="currentUser && currentUser.id === skill.userId">
              <button
                class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:border-blue-500 transition-all duration-200"
              >Edit</button>
              <button
                @click="deleteSkill(skill.id)"
                class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded hover:bg-red-600 hover:border-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:border-red-500 transition-all duration-200"
              >Delete</button>
            </template>
            <a
              v-if="skill.url"
              :href="skill.url"
              target="_blank"
              class="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2"></path>
                <polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="2"></polyline>
                <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2"></line>
              </svg>
            </a>
          </div>
        </div>

        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ skill.description }}</p>

        <div v-if="skill.imageUrl" class="mt-4 rounded-lg overflow-hidden">
          <img :src="skill.imageUrl" :alt="skill.name" class="w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { skillsAPI } from '@/services/api'

export default {
  name: 'SkillsSection',
  props: { currentUser: Object },
  setup() {
    const skills = ref([])
    const loading = ref(false)
    const error = ref(null)

    const loadSkills = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await skillsAPI.getAll()
        skills.value = response.data
      } catch (err) {
        error.value = 'Failed to load skills'
        console.error('Error loading skills:', err)
      } finally {
        loading.value = false
      }
    }

    const deleteSkill = async (id) => {
      if (!confirm('Are you sure you want to delete this skill?')) return
      try {
        await skillsAPI.delete(id)
        skills.value = skills.value.filter(sk => sk.id !== id)
      } catch (err) {
        console.error('Failed to delete skill', err)
        alert('Failed to delete skill')
      }
    }

    onMounted(loadSkills)

    return { skills, loading, error, deleteSkill }
  }
}
</script>