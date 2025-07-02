<template>
  <div class="home">
    <Head>
      <title>Hristijan Stojcheski - Salesforce Full-Stack Developer</title>
      <meta
        name="description"
        content="Salesforce Full-Stack Developer with 4+ years of experience in enterprise CRM solutions, Apex, Lightning Web Components, and Vue.js development."
      />
    </Head>

    <!-- Enhanced Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <span class="greeting">Hi there! I'm</span>
          <h1 class="hero-title">Hristijan Stojcheski</h1>
          <h2 class="hero-subtitle">Salesforce Developer & Software Engineer</h2>
          <p class="hero-description">
            Passionate about building scalable enterprise solutions with 4+ years of experience in
            Salesforce development, Lightning Web Components, and modern web technologies. Currently
            expanding my skills with Vue.js and full-stack development.
          </p>
          <div class="hero-actions">
            <router-link to="/contact" class="btn btn-primary">
              <span>Let's Connect</span>
            </router-link>
            <!--<a href="/resume.pdf" class="btn btn-outline" target="_blank" rel="noopener">
              <span>Download Resume</span>
            </a>-->
          </div>
        </div>
        <div class="hero-image">
          <div class="profile-container">
            <div class="profile-placeholder">
              <img
                src="@/assets/profile-placeholder.png"
                alt="Hristijan Stojcheski - Salesforce Developer"
              />
            </div>
            <div class="floating-tech-icons">
              <div class="tech-icon salesforce">SF</div>
              <div class="tech-icon vue">Vue</div>
              <div class="tech-icon java">Java</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Overview -->
    <section class="skills-overview">
      <div class="container">
        <h2>Core Expertise</h2>
        <div class="skills-grid">
          <div class="skill-category">
            <div class="skill-icon">⚡</div>
            <h3>Salesforce Development</h3>
            <p>Apex, Lightning Web Components, OmniStudio, B2B Solutions</p>
          </div>
          <div class="skill-category">
            <div class="skill-icon">🔧</div>
            <h3>Full-Stack Development</h3>
            <p>Vue.js, Node.js, MongoDB, REST APIs</p>
          </div>
          <div class="skill-category">
            <div class="skill-icon">🔗</div>
            <h3>System Integration</h3>
            <p>Data Migration, API Development, Third-party Connectors</p>
          </div>
          <div class="skill-category">
            <div class="skill-icon">📊</div>
            <h3>Analytics & Reporting</h3>
            <p>Tableau, Piwik Pro, Data Visualization, Business Intelligence</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Professional Summary with CTA -->
    <section class="summary">
      <div class="container">
        <h2>About My Work</h2>
        <div class="summary-content">
          <p class="summary-text">
            I'm a versatile Software Engineer specializing in enterprise-grade solutions for CRM
            platforms and full-stack applications. Currently focused on Salesforce development for
            large-scale B2B telecom implementations, I bring proven expertise in
            <strong>Apex</strong>, <strong>Lightning Web Components</strong>, and
            <strong>OmniStudio</strong>.
          </p>
          <p class="summary-text">
            Beyond Salesforce, I have extensive experience building applications with Java, C++,
            Vue.js, Node.js, and MongoDB. I thrive in cross-functional teams using Agile
            methodologies and am passionate about clean code, system integration, and delivering
            solutions that balance business needs with technical precision.
          </p>
          <div class="cta-section">
            <router-link to="/about" class="read-more-button">
              Learn More About My Background →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="featured-projects">
      <div class="container">
        <div class="section-header">
          <h2>Featured Projects</h2>
          <p>Highlights from my professional work and personal development</p>
        </div>
        <div class="projects-grid">
          <article class="project-card">
            <div class="project-tags">
              <span class="tag">Vue.js</span>
              <span class="tag">Node.js</span>
              <span class="tag">MongoDB</span>
            </div>
            <h3>Portfolio & Blog Website</h3>
            <p>
              Full-stack personal portfolio with blog management system, built with Vue.js 3,
              TypeScript, and Express.js. Features responsive design, state management with Pinia,
              and deployment on DigitalOcean with SSL.
            </p>
            <div class="project-footer">
              <router-link to="/projects" class="read-more">View project →</router-link>
            </div>
          </article>

          <article class="project-card">
            <div class="project-tags">
              <span class="tag">Salesforce</span>
              <span class="tag">LWC</span>
              <span class="tag">OmniStudio</span>
            </div>
            <h3>Enterprise B2B Telecom Platform</h3>
            <p>
              Large-scale Salesforce implementation for European telecom provider. Built custom
              Lightning Web Components, OmniStudio flows, and API integrations across Sales, CPQ,
              and Service clouds.
            </p>
            <div class="project-footer">
              <router-link to="/projects" class="read-more">View project →</router-link>
            </div>
          </article>
        </div>
        <div class="view-all">
          <router-link to="/projects" class="btn btn-outline">View All Projects</router-link>
        </div>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="latest-blogs">
      <div class="container">
        <div class="section-header">
          <h2>Latest Insights</h2>
          <p>Thoughts on development, technology, and industry trends</p>
        </div>

        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <p>Loading latest articles...</p>
        </div>

        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
        </div>

        <div v-else-if="!featuredPosts || featuredPosts.length === 0" class="no-posts">
          <p>New articles coming soon! Follow me on LinkedIn for updates.</p>
        </div>

        <div v-else class="blog-preview-grid">
          <article v-for="post in featuredPosts" :key="post.id" class="blog-preview">
            <h3>{{ post.title }}</h3>
            <p class="date">{{ post.date }}</p>
            <p>{{ post.summary }}</p>
            <router-link :to="`/blog/${post.slug}`" class="read-more">Read Article →</router-link>
          </article>
        </div>

        <div class="view-all">
          <router-link to="/blog" class="btn btn-outline">View All Articles</router-link>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Work Together?</h2>
          <p>
            I'm always interested in new opportunities and exciting projects. Let's discuss how I
            can help bring your ideas to life.
          </p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-primary">Get In Touch</router-link>
            <a href="mailto:hristijan.stojcheski@outlook.com" class="btn btn-secondary"
              >Email Me Directly</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useBlogStore } from '@/stores/BlogStore'
import { Head } from '@vueuse/head'
import { useSEO, pagesSEO } from '@/composables'

const blogStore = useBlogStore()
const loading = computed(() => blogStore.loading)
const error = computed(() => blogStore.error)

const featuredPosts = computed(() => {
  try {
    const posts = blogStore.getAllPosts
    return Array.isArray(posts) ? posts.slice(0, 3) : []
  } catch (err) {
    console.error('Error getting featured posts:', err)
    return []
  }
})

useSEO(pagesSEO.home)

onMounted(async () => {
  try {
    if (!blogStore.posts || blogStore.posts.length === 0) {
      await blogStore.fetchPosts()
    }
  } catch (err) {
    console.error('Error fetching posts on mount:', err)
  }
})
</script>

<style scoped>
.home {
  --section-spacing: 6rem;
  --primary-color: #41b883;
  --secondary-color: #349268;
  --text-color: #333;
  --text-muted: #6c757d;
  --bg-light: #f8f9fa;
  --border-radius: 8px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

section {
  margin-bottom: var(--section-spacing);
}

/* Enhanced Hero Section */
.hero {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23000" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.hero .container {
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;
  z-index: 1;
}

.hero-content {
  flex: 1;
}

.greeting {
  display: block;
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 2rem;
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  border: 2px solid transparent;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background: var(--secondary-color);
  border-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(65, 184, 131, 0.3);
}

.btn-outline {
  color: var(--primary-color);
  border-color: var(--primary-color);
  background: transparent;
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--text-color);
  color: white;
  border-color: var(--text-color);
}

.btn-secondary:hover {
  background: #555;
  border-color: #555;
  transform: translateY(-2px);
}

/* Hero Image */
.hero-image {
  flex: 0 0 300px;
}

.profile-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-placeholder {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--primary-color);
  box-shadow: 0 8px 32px rgba(65, 184, 131, 0.3);
}

.profile-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.floating-tech-icons {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.tech-icon {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: float 3s ease-in-out infinite;
}

.tech-icon.salesforce {
  top: 20%;
  right: -10%;
  color: #0070d2;
  animation-delay: 0s;
}

.tech-icon.vue {
  bottom: 30%;
  right: -5%;
  color: #41b883;
  animation-delay: 1s;
}

.tech-icon.java {
  top: 60%;
  left: -10%;
  color: #ed8b00;
  animation-delay: 2s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

/* Skills Overview */
.skills-overview {
  padding: 4rem 0;
  background: white;
}

.skills-overview h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skill-category {
  text-align: center;
  padding: 2rem;
  border-radius: var(--border-radius);
  background: var(--bg-light);
  transition: var(--transition);
}

.skill-category:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}

.skill-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.skill-category h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.skill-category p {
  color: var(--text-muted);
  line-height: 1.5;
}

/* Summary Section */
.summary {
  padding: 4rem 0;
  background: var(--bg-light);
}

.summary h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-color);
}

.summary-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.summary-text {
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.cta-section {
  margin-top: 2rem;
}

/* Fixed styling for the "Learn More" button */
.read-more-button {
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  border: 2px solid var(--primary-color);
}

.read-more-button:hover {
  background: var(--secondary-color);
  border-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(65, 184, 131, 0.3);
}

.read-more {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.read-more:hover {
  text-decoration: underline;
}

/* Enhanced Projects */
.featured-projects {
  padding: 4rem 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.section-header p {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  border: 1px solid #f0f0f0;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.project-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(65, 184, 131, 0.1);
  color: var(--primary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.project-card p {
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Blog Section */
.latest-blogs {
  padding: 4rem 0;
  background: var(--bg-light);
}

.blog-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-preview {
  background: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.blog-preview:hover {
  transform: translateY(-5px);
}

.blog-preview h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.blog-preview .date {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.blog-preview p {
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

/* Loading and Error States */
.loading {
  text-align: center;
  padding: 3rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(65, 184, 131, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  text-align: center;
  padding: 3rem;
  color: #dc3545;
}

.no-posts {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}

.view-all {
  text-align: center;
  margin-top: 2rem;
}

/* CTA Section */
.cta-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero .container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-image {
    flex: none;
  }

  .profile-placeholder {
    width: 200px;
    height: 200px;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .blog-preview-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
