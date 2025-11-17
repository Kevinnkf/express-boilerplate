<!-- src/components/layout/SidebarContent.vue -->
<template>
  <div class="sidebar-content">
    <!-- Profile Info -->
    <div class="profile-section">
      <h1 class="main-name">Kevin Khalfani Fadillah</h1>
      <h2 class="title-line">
        Software Engineer 
        <span class="desktop-name">Building Scalable Systems</span>
      </h2>

      <!-- Location -->
      <div class="location" aria-label="Location">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10 18C10 18 16 11.6863 16 7.85714C16 4.22857 13.3137 2 10 2C6.68629 2 4 4.22857 4 7.85714C4 11.6863 10 18 10 18Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <circle cx="10" cy="8" r="2.25" stroke="currentColor" stroke-width="1.5"></circle>
        </svg>
        <span>Jakarta, Indonesia</span>
      </div>

      <!-- Description -->
      <p class="description">
        I build performant systems that elevate user experience and product scalability. 
        I'm also actively exploring how AI can power the next generation of products.
      </p>
    </div>

    <!-- Navigation Links -->
    <nav class="jump-links" aria-label="In-page jump links">
      <div class="link-item" :class="{ active: activeSection === 'about' }" @click="scrollToSection('about')">
        <div class="link-indicator" :class="{ active: activeSection === 'about' }"></div>
        <span class="link-text">About</span>
      </div>
      <div class="link-item" :class="{ active: activeSection === 'experience' }" @click="scrollToSection('experience')">
        <div class="link-indicator" :class="{ active: activeSection === 'experience' }"></div>
        <span class="link-text">Experiences</span>
      </div>
      <div class="link-item" :class="{ active: activeSection === 'projects' }" @click="scrollToSection('projects')">
        <div class="link-indicator" :class="{ active: activeSection === 'projects' }"></div>
        <span class="link-text">Projects</span>
      </div>
      <div class="link-item" :class="{ active: activeSection === 'skills' }" @click="scrollToSection('skills')">
        <div class="link-indicator" :class="{ active: activeSection === 'skills' }"></div>
        <span class="link-text">Skills</span>
      </div>
      <div class="link-item" :class="{ active: activeSection === 'contact' }" @click="scrollToSection('contact')">
        <div class="link-indicator" :class="{ active: activeSection === 'contact' }"></div>
        <span class="link-text">Contact</span>
      </div>
    </nav>

    <!-- Social Links & Theme Toggle -->
    <div class="sidebar-footer">
      <div class="social-links">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5808 20.2773 21.0498 21.7438 19.0074C23.2103 16.9651 23.9994 14.5143 24 12C24 5.37 18.63 0 12 0Z" fill="currentColor"></path>
          </svg>
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.5 2H3.5C3.10218 2 2.72064 2.15804 2.43934 2.43934C2.15804 2.72064 2 3.10218 2 3.5V20.5C2 20.8978 2.15804 21.2794 2.43934 21.5607C2.72064 21.842 3.10218 22 3.5 22H20.5C20.8978 22 21.2794 21.842 21.5607 21.5607C21.842 21.2794 22 20.8978 22 20.5V3.5C22 3.10218 21.842 2.72064 21.5607 2.43934C21.2794 2.15804 20.8978 2 20.5 2ZM8 19H5V10H8V19ZM6.5 8.25C6.15618 8.24017 5.82288 8.12924 5.54175 7.93108C5.26062 7.73291 5.04411 7.45629 4.9193 7.13578C4.79448 6.81527 4.76687 6.46508 4.83994 6.12897C4.913 5.79286 5.0835 5.48574 5.33011 5.24597C5.57673 5.00621 5.88853 4.84443 6.22656 4.78086C6.5646 4.71729 6.91387 4.75475 7.23074 4.88854C7.5476 5.02234 7.81802 5.24655 8.00819 5.53315C8.19836 5.81975 8.29986 6.15604 8.3 6.5C8.2921 6.97035 8.09834 7.41845 7.76105 7.74637C7.42376 8.07428 6.97039 8.25535 6.5 8.25ZM19 19H16V14.26C16 12.84 15.4 12.33 14.62 12.33C14.3913 12.3452 14.1679 12.4055 13.9625 12.5073C13.7572 12.6091 13.574 12.7505 13.4235 12.9234C13.273 13.0962 13.1581 13.2971 13.0854 13.5144C13.0127 13.7318 12.9837 13.9614 13 14.19C12.995 14.2365 12.995 14.2835 13 14.33V19H10V10H12.9V11.3C13.1925 10.855 13.5944 10.4926 14.0672 10.2474C14.54 10.0023 15.0677 9.88267 15.6 9.9C17.15 9.9 18.96 10.76 18.96 13.56L19 19Z" fill="currentColor"></path>
          </svg>
        </a>
        <a href="mailto:your.email@gmail.com" class="social-link" aria-label="Email">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor"></rect>
            <path d="M5 7L12 13L19 7" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </a>
      </div>

      <button @click="$emit('toggle-dark-mode')" class="theme-toggle">
        {{ darkMode ? '☀️' : '🌙' }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SidebarContent',
  props: {
    darkMode: Boolean
  },
  emits: ['toggle-dark-mode'],
  setup() {
    const activeSection = ref('about')

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        activeSection.value = sectionId;
      }
    }

    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            activeSection.value = section;
            break;
          }
        }
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    })

    return {
      activeSection,
      scrollToSection
    }
  }
}
</script>

<style scoped>
.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.profile-section {
  margin-bottom: 3rem;
}

.main-name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.title-line {
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.desktop-name {
  display: block;
  margin-top: 0.25rem;
}

.location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.location svg {
  color: var(--text-secondary);
}

.description {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

/* Jump Links */
.jump-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  cursor: pointer;
  transition: all 0.3s;
}

.link-item.active .link-text {
  color: var(--text-primary);
}

.link-indicator {
  height: 1px;
  width: 2rem;
  background-color: var(--border);
  transition: all 0.3s;
}

.link-item.active .link-indicator {
  width: 3rem;
}

.link-item:nth-child(1) .link-indicator.active {
  background-color: #E86A24;
}

.link-item:nth-child(2) .link-indicator.active {
  background-color: #ffca4a;
}

.link-item:nth-child(3) .link-indicator.active {
  background-color: #00cc61;
}

.link-item:nth-child(4) .link-indicator.active {
  background-color: #3182ce;
}

.link-item:nth-child(5) .link-indicator.active {
  background-color: #805ad5;
}

.link-item:hover .link-indicator {
  width: 3rem;
  background-color: var(--accent);
}

.link-text {
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.3s;
  color: var(--text-secondary);
}

.link-item:hover .link-text {
  color: var(--text-primary);
}

/* Sidebar Footer */
.sidebar-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: var(--text-secondary);
  transition: opacity 0.3s;
}

.social-link:hover {
  opacity: 0.7;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s;
  color: var(--text-secondary);
}

.theme-toggle:hover {
  background-color: var(--border);
}
</style>