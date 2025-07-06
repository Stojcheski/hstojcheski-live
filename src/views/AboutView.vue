<template>
  <div class="about">
    <div class="container">
      <h1>About Me</h1>

      <section class="about-content">
        <div class="about-text">
          <p>
            I'm Hristijan Stojcheski, a Software Engineer and Salesforce Full-Stack Developer with
            4+ years of experience delivering scalable enterprise CRM solutions. I specialize in
            Apex, Lightning Web Components (LWC), and OmniStudio, with a proven track record in
            Salesforce-based B2B telecom implementations.
          </p>

          <p>
            Passionate about designing and optimizing complex systems, I've helped organizations
            automate workflows, integrate platforms, and boost system performance through robust,
            secure, and maintainable solutions.
          </p>

          <h2>Professional Background</h2>
          <p>
            As a Salesforce Engineer at Avenga (formerly Qinshift), I work across multiple squads
            building and enhancing a large-scale Salesforce implementation for a major European
            telecom provider. My responsibilities include custom LWC development, OmniStudio-based
            automation, API integrations, CPQ configuration, and mentoring junior team members.
          </p>

          <h2>Education</h2>
          <p>
            I'm currently pursuing a Master's degree in Software Engineering and Applications at the
            Faculty of Information and Communication Technologies in Bitola. I also hold a
            Bachelor's degree in Computer Science and Communications Engineering from the same
            university.
          </p>

          <h2>Certifications</h2>
          <ul>
            <li>Agentforce Specialist (2025)</li>
            <li>Salesforce Certified Platform Developer II (2025)</li>
            <li>Salesforce Certified Data Cloud Consultant (2025)</li>
            <li>Salesforce Certified Administrator (2024)</li>
            <li>Salesforce Certified Platform Developer I (2023)</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSEO, pagesSEO } from '@/composables'
useSEO(pagesSEO.about)
</script>

<style scoped>
.about {
  padding: 3rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
}

h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: #41b883;
}

.about-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
  font-size: 1.1rem;
  color: #333;
}

ul {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>
