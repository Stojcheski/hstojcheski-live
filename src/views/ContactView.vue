<template>
  <div class="contact">
    <div class="container">
      <h1>Contact Me</h1>
      <p class="intro">Have a question or want to work together? Feel free to reach out!</p>

      <div class="contact-grid">
        <div class="contact-form-container">
          <h2>Send me a message</h2>
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                placeholder="Your name"
                class="input-field"
              />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                placeholder="Your email address"
                class="input-field"
              />
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input
                type="text"
                id="subject"
                v-model="form.subject"
                required
                placeholder="Subject of your message"
                class="input-field"
              />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                placeholder="Your message"
                class="input-field"
              ></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="submitting">
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>

            <div v-if="formStatus" :class="['form-status', formStatus.type]">
              {{ formStatus.message }}
            </div>
          </form>
        </div>

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
              <p><a href="mailto:contact@hstojcheski.live">contact@hstojcheski.live</a></p>
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
              <p>Macedonia</p>
            </div>
          </div>

          <div class="social-links">
            <h3>Connect with me</h3>
            <div class="social-icons">
              <a
                href="https://linkedin.com/in/"
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
                href="https://github.com/"
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
              <a
                href="https://twitter.com/"
                target="_blank"
                class="social-icon twitter"
                title="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
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
import { reactive, ref } from 'vue'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: 'success' | 'error'
  message: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitting = ref<boolean>(false)
const formStatus = ref<FormStatus | null>(null)

const submitForm = async (): Promise<void> => {
  // In a real application, you would integrate with a backend API
  // For now, we'll simulate the form submission
  submitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Success message
    formStatus.value = {
      type: 'success',
      message: 'Your message has been sent successfully! I will get back to you soon.',
    }

    // Reset the form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    // Error message
    formStatus.value = {
      type: 'error',
      message: 'There was an error sending your message. Please try again later. Error: ' + error,
    }
  } finally {
    submitting.value = false

    // Clear status message after 5 seconds
    setTimeout(() => {
      formStatus.value = null
    }, 5000)
  }
}
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
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
}

.contact-form-container,
.contact-info {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

/* Form styles */
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

/* Contact info styles */
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
    grid-template-columns: 1fr;
  }
}
</style>
