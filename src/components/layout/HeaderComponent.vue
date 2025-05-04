<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/">Hristijan Stojcheski</router-link>
      </div>
      <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <nav class="navigation" :class="{ 'mobile-active': mobileMenuOpen }">
        <ul>
          <li><router-link to="/" @click="closeMobileMenu">Home</router-link></li>
          <li><router-link to="/about" @click="closeMobileMenu">About</router-link></li>
          <li><router-link to="/experience" @click="closeMobileMenu">Experience</router-link></li>
          <li><router-link to="/skills" @click="closeMobileMenu">Skills</router-link></li>
          <li><router-link to="/projects" @click="closeMobileMenu">Projects</router-link></li>
          <li><router-link to="/tasks" @click="closeMobileMenu">TO;DOs</router-link></li>
          <li><router-link to="/blog" @click="closeMobileMenu">Blog</router-link></li>
          <li><router-link to="/contact" @click="closeMobileMenu">Contact</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = (): void => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = (): void => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
}

.navigation ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navigation a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition:
    border-color 0.3s,
    color 0.3s;
}

.navigation a:hover,
.navigation a.router-link-active {
  border-color: #41b883;
  color: #41b883;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.bar {
  height: 3px;
  width: 100%;
  background-color: #333;
  border-radius: 10px;
  transition:
    transform 0.3s,
    opacity 0.3s;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .logo a {
    font-size: 1.2rem;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .navigation {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 5rem 2rem 2rem;
    transition: right 0.3s ease;
    z-index: 5;
  }

  .navigation.mobile-active {
    right: 0;
  }

  .navigation ul {
    flex-direction: column;
    gap: 1.5rem;
  }

  .mobile-active ~ .mobile-menu-toggle .bar:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }

  .mobile-active ~ .mobile-menu-toggle .bar:nth-child(2) {
    opacity: 0;
  }

  .mobile-active ~ .mobile-menu-toggle .bar:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}
</style>
