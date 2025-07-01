<template>
  <div class="home">
    <Head>
      <title>Hristijan Stojcheski - Salesforce Developer & Software Engineer</title>
      <meta
        name="description"
        content="Versatile Software Engineer with 4+ years of experience in Salesforce development, CRM platforms, and full-stack applications. Specializing in Apex, Lightning Web Components, and enterprise solutions."
      />
      <meta
        name="keywords"
        content="Salesforce Developer, Software Engineer, Apex, Lightning Web Components, LWC, Vue.js, Java, Macedonia, Enterprise Solutions"
      />
      <meta
        property="og:title"
        content="Hristijan Stojcheski - Salesforce Developer & Software Engineer"
      />
      <meta
        property="og:description"
        content="Experienced Software Engineer specializing in Salesforce development and enterprise solutions. Available for freelance and full-time opportunities."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://hstojcheski.live" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href="https://hstojcheski.live" />
    </Head>

    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>
            <span class="greeting">Hi, I'm</span>
            Hristijan Stojcheski
          </h1>
          <h2>
            <span class="typewriter">Salesforce Developer</span>
            <span class="subtitle"> & Software Engineer</span>
          </h2>
          <p class="tagline">
            I build scalable enterprise solutions with 4+ years of experience in Salesforce
            development, full-stack applications, and system integrations. Based in Macedonia,
            available globally.
          </p>

          <!-- Quick Stats -->
          <div class="quick-stats">
            <div class="stat">
              <span class="stat-number">4+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat">
              <span class="stat-number">2</span>
              <span class="stat-label">Projects Delivered</span>
            </div>
            <div class="stat">
              <span class="stat-number">5+</span>
              <span class="stat-label">Technologies</span>
            </div>
          </div>

          <div class="cta-buttons">
            <router-link to="/projects" class="btn btn-primary">
              <span>View My Work</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </router-link>
            <router-link to="/contact" class="btn btn-secondary">
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
          <div class="summary-cta">
            <router-link to="/about" class="btn btn-primary">Learn More About Me</router-link>
            <router-link to="/experience" class="read-more">View My Experience →</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-projects">
      <div class="container">
        <div class="section-header">
          <h2>Featured Projects</h2>
          <p>Here are some of my recent work highlights</p>
        </div>
        <div class="projects-grid">
          <article class="project-card">
            <div class="project-tags">
              <span class="tag">Salesforce</span>
              <span class="tag">B2B</span>
              <span class="tag">Telecom</span>
            </div>
            <h3>Salesforce B2B Telecom Solution</h3>
            <p>
              Led development and enhancement of a comprehensive B2B Salesforce solution for a major
              European telecom provider, improving customer onboarding by 40% and reducing
              processing time.
            </p>
            <div class="project-footer">
              <router-link to="/projects" class="read-more">View project →</router-link>
            </div>
          </article>

          <article class="project-card">
            <div class="project-tags">
              <span class="tag">Integration</span>
              <span class="tag">API</span>
              <span class="tag">Analytics</span>
            </div>
            <h3>Piwik Pro Salesforce Connector</h3>
            <p>
              Developed a robust Salesforce connector for Piwik PRO analytics platform, enabling
              seamless data integration using metadata APIs and enhancing marketing attribution
              tracking.
            </p>
            <div class="project-footer">
              <router-link to="/projects" class="read-more">View project →</router-link>
            </div>
          </article>

          <article class="project-card">
            <div class="project-tags">
              <span class="tag">Tableau</span>
              <span class="tag">Visualization</span>
              <span class="tag">BI</span>
            </div>
            <h3>Tableau Analytics Integration</h3>
            <p>
              Created comprehensive data visualization and reporting solutions by integrating
              Tableau with Piwik Pro, delivering actionable insights for data-driven decision
              making.
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

        <div v-else-if="featuredPosts.length === 0" class="no-posts">
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

const blogStore = useBlogStore()
const loading = computed(() => blogStore.loading)
const error = computed(() => blogStore.error)

const featuredPosts = computed(() => {
  return blogStore.getAllPosts.slice(0, 3)
})

onMounted(() => {
  if (blogStore.posts.length === 0) {
    blogStore.fetchPosts()
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
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
  line-height: 1.1;
}

h2 {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.subtitle {
  color: var(--text-muted);
  font-weight: 400;
}

.tagline {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
}

.quick-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid transparent;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-secondary:hover {
  background-color: var(--primary-color);
  color: white;
}

.btn-outline {
  background-color: transparent;
  color: var(--text-color);
  border-color: #ddd;
}

.btn-outline:hover {
  background-color: var(--text-color);
  color: white;
}

/* Enhanced Hero Image */
.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.profile-container {
  position: relative;
}

.profile-placeholder {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
  border: 4px solid white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.profile-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.floating-tech-icons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  font-weight: 700;
  box-shadow: var(--box-shadow);
  animation: float 3s ease-in-out infinite;
}

.tech-icon.salesforce {
  top: 20%;
  right: -10%;
  color: #00a1e0;
  animation-delay: 0s;
}

.tech-icon.vue {
  bottom: 30%;
  left: -10%;
  color: #4fc08d;
  animation-delay: 1s;
}

.tech-icon.java {
  top: 60%;
  right: 10%;
  color: #ed8b00;
  animation-delay: 2s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Skills Overview */
.skills-overview {
  padding: 4rem 0;
  background: white;
}

.skills-overview h2 {
  text-align: center;
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
  padding: 2rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.skill-category:hover {
  transform: translateY(-5px);
}

.skill-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.skill-category h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.skill-category p {
  color: var(--text-muted);
  line-height: 1.6;
}

/* Enhanced Summary */
.summary {
  padding: 4rem 0;
  background: var(--bg-light);
}

.summary h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.summary-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.summary-text {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.summary-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
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

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

.cta-section .btn-primary {
  background: white;
  color: var(--primary-color);
}

.cta-section .btn-secondary {
  border-color: white;
  color: white;
}

.cta-section .btn-secondary:hover {
  background: white;
  color: var(--primary-color);
}

/* Loading States */
.loading {
  text-align: center;
  padding: 3rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.view-all {
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero .container {
    flex-direction: column-reverse;
    text-align: center;
    gap: 2rem;
  }

  .hero {
    padding: 4rem 0;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  .quick-stats {
    justify-content: center;
  }

  .cta-buttons {
    justify-content: center;
  }

  .summary-cta {
    flex-direction: column;
    gap: 1rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .profile-placeholder {
    width: 250px;
    height: 250px;
  }

  .floating-tech-icons {
    display: none;
  }
}

@media (max-width: 480px) {
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style>
