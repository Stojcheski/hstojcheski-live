<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Hristijan Stojcheski</h1>
          <h2>Software Engineer</h2>
          <p class="tagline">
            Specializing in Salesforce development although always open for an expansion of my skill
            set
          </p>
          <div class="cta-buttons">
            <router-link to="/projects" class="btn btn-primary">View Projects</router-link>
            <router-link to="/contact" class="btn btn-secondary">Contact Me</router-link>
          </div>
        </div>
        <div class="hero-image">
          <div class="profile-placeholder">
            <img src="@/assets/profile-placeholder.png" alt="Hristijan Stojcheski" />
          </div>
        </div>
      </div>
    </section>

    <section class="summary">
      <div class="container">
        <h2>Professional Summary</h2>
        <p>
          Experienced Salesforce Developer specializing in enterprise B2B telecom implementations,
          with a focus on Apex, Lightning Web Components (LWC), and Omnistudio (Dataraptors,
          OmniScripts, Integration Procedures, FlexCards). I've contributed to the development and
          enhancement of a Salesforce-based telecom solution for a major European provider, ensuring
          seamless automation, integrations, and data management.
        </p>
        <router-link to="/about" class="read-more">Read more about me →</router-link>
      </div>
    </section>

    <section class="featured-projects">
      <div class="container">
        <h2>Featured Projects</h2>
        <div class="projects-grid">
          <div class="project-card">
            <h3>Salesforce B2B Telecom Solution</h3>
            <p>
              Contributed to the development and enhancement of a B2B Salesforce solution for a
              major European telecom provider.
            </p>
            <router-link to="/projects" class="read-more">Learn more →</router-link>
          </div>
          <div class="project-card">
            <h3>Piwik Pro Connector for Salesforce</h3>
            <p>
              Developed a Salesforce connector for Piwik PRO, enhancing data integration using
              metadata and REST APIs.
            </p>
            <router-link to="/projects" class="read-more">Learn more →</router-link>
          </div>
          <div class="project-card">
            <h3>Tableau Integration with Piwik Pro</h3>
            <p>
              Created data visualization and reporting solutions by integrating Tableau with Piwik
              Pro.
            </p>
            <router-link to="/projects" class="read-more">Learn more →</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="latest-blogs">
      <div class="container">
        <h2>Latest Articles</h2>
        <div v-if="loading" class="loading">
          <p>Loading latest articles...</p>
        </div>
        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
        </div>
        <div v-else-if="featuredPosts.length === 0" class="no-posts">
          <p>No articles available at the moment.</p>
        </div>
        <div v-else class="blog-preview-grid">
          <div v-for="post in featuredPosts" :key="post.id" class="blog-preview">
            <h3>{{ post.title }}</h3>
            <p class="date">{{ post.date }}</p>
            <p>{{ post.summary }}</p>
            <router-link :to="`/blog/${post.slug}`" class="read-more">Read article →</router-link>
          </div>
        </div>
        <div class="view-all">
          <router-link to="/blog" class="btn btn-outline">View All Articles</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useBlogStore } from '@/stores/BlogStore'

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
  --section-spacing: 5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

section {
  margin-bottom: var(--section-spacing);
}

/* Hero section */
.hero {
  padding: 5rem 0;
  background-color: #f8f9fa;
}

.hero .container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.hero-content {
  flex: 1;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.profile-placeholder {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e9ecef;
}

.profile-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #41b883;
}

.tagline {
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #41b883;
  color: white;
}

.btn-primary:hover {
  background-color: #349268;
}

.btn-secondary {
  background-color: transparent;
  color: #41b883;
  border: 2px solid #41b883;
}

.btn-secondary:hover {
  background-color: rgba(65, 184, 131, 0.1);
}

/* Summary section */
.summary {
  padding: 3rem 0;
}

.summary h2 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.summary p {
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto 1.5rem;
  text-align: center;
}

.read-more {
  color: #41b883;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.read-more:hover {
  text-decoration: underline;
}

/* Featured projects */
.featured-projects {
  padding: 3rem 0;
  background-color: #f8f9fa;
}

.featured-projects h2,
.latest-blogs h2 {
  text-align: center;
  margin-bottom: 2.5rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.project-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

/* Latest blogs section */
.latest-blogs {
  padding: 3rem 0;
}

.blog-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.blog-preview {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.blog-preview h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.blog-preview .date {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.view-all {
  text-align: center;
}

.btn-outline {
  background-color: transparent;
  color: #41b883;
  border: 2px solid #41b883;
  padding: 0.75rem 2rem;
}

.btn-outline:hover {
  background-color: #41b883;
  color: white;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero .container {
    flex-direction: column-reverse;
    text-align: center;
  }

  .cta-buttons {
    justify-content: center;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.8rem;
  }
}
</style>
