<template>
  <div class="contact">
    <div class="container">
      <h1>Contact Me</h1>
      <p class="intro">Have a question or want to work together? Feel free to reach out!</p>

      <div class="contact-grid">
        <div class="contact-info">
          <h2>Contact Information</h2>

          <div class="info-item">
            <div class="info-icon email">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div class="info-content">
              <h3>Email</h3>
              <p><a href="mailto:kiko.stojceski99@gmail.com">kiko.stojceski99@gmail.com</a></p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon email">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div class="info-content">
              <h3>Email</h3>
              <p>
                <a href="mailto:hristijan.stojcheski@outlook.com"
                  >hristijan.stojcheski@outlook.com</a
                >
              </p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div class="info-content">
              <h3>Location</h3>
              <p>North Macedonia</p>
            </div>
          </div>

          <div class="social-links">
            <h3>Connect with me</h3>
            <div class="social-icons">
              <a
                href="https://www.linkedin.com/in/hristijanstojcheski/"
                target="_blank"
                class="social-icon linkedin"
                title="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                  ></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://github.com/Stojcheski"
                target="_blank"
                class="social-icon github"
                title="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSEO, pagesSEO } from '@/composables'
useSEO(pagesSEO.contact)
</script>

<style scoped>
.contact {
  padding: 3rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

.intro {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
}

.contact-grid {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.contact-form-container,
.contact-info {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #41b883;
}

.submit-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  background-color: #41b883;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background-color: #349268;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-status {
  margin-top: 1.5rem;
  padding: 0.75rem;
  border-radius: 4px;
}

.form-status.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-status.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.info-item {
  display: flex;
  margin-bottom: 1.5rem;
}

.info-icon {
  width: 40px;
  height: 40px;
  background-color: #f0f8f4;
  border-radius: 50%;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #41b883;
}

.info-content h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: #333;
}

.info-content p {
  color: #666;
}

.info-content a {
  color: #41b883;
  text-decoration: none;
}

.info-content a:hover {
  text-decoration: underline;
}

.social-links {
  margin-top: 2rem;
}

.social-links h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #333;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f8f4;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  color: #41b883;
}

.social-icon:hover {
  background-color: #41b883;
  color: white;
}

@media (max-width: 768px) {
  .contact-grid {
    justify-content: center;
  }

  .contact-info {
    max-width: 100%;
  }
}
</style>
