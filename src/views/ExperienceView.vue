<template>
  <div class="experience">
    <div class="container">
      <h1>Professional Experience</h1>

      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-date">April 2025 - Present</div>
            <h2>Full-stack Developer</h2>
            <h3>Personal Project</h3>
            <p>Vue.js Portfolio & Blog Development</p>
            <ul>
              <li>
                Designed and developed a personal portfolio and blog website using Vue.js 3,
                TypeScript, and Vite
              </li>
              <li>
                Implemented a responsive design with custom CSS for an optimal viewing experience
                across devices
              </li>
              <li>
                Built a full-stack application with Node.js and Express backend for blog content
                management
              </li>
              <li>Set up MongoDB for data storage with Mongoose ODM for structured data models</li>
              <li>Utilized Pinia for state management across the application</li>
              <li>
                Deployed the application to a DigitalOcean droplet with Nginx and SSL configuration
              </li>
              <li>Implemented CI/CD practices for streamlined development and deployment</li>
            </ul>
            <div class="tech-stack">
              <span class="tech-tag">Vue.js 3</span>
              <span class="tech-tag">TypeScript</span>
              <span class="tech-tag">Vite</span>
              <span class="tech-tag">Node.js</span>
              <span class="tech-tag">Express</span>
              <span class="tech-tag">MongoDB</span>
              <span class="tech-tag">Nginx</span>
              <span class="tech-tag">Git</span>
            </div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-date">February 2023 - April 2025</div>
            <h2>Salesforce Developer</h2>
            <h3>Avenga</h3>
            <p>Enterprise B2B Telecom Salesforce Implementation</p>
            <ul>
              <li>
                Delivered scalable Salesforce solutions for a large European B2B telecom client
                across Sales, CPQ, Service, and Marketing clouds.
              </li>
              <li>
                Developed and maintained custom Lightning Web Components (LWC), Apex triggers, and
                screen flows to enhance business workflows and improve user experience.
              </li>
              <li>
                Built OmniStudio assets (OmniScripts, Integration Procedures, DataRaptors,
                FlexCards) to streamline guided processes and backend automation.
              </li>
              <li>
                Implemented CPQ logic including guided selling, dynamic pricing, and approval
                workflows to improve sales efficiency.
              </li>
              <li>
                Led system integrations using REST and SOAP APIs and collaborated closely with
                middleware teams for reliable data synchronization.
              </li>
              <li>
                Executed data migration from legacy Java CRM into Salesforce using DataLoader and
                Excel mapping with deduplication and transformation strategies.
              </li>
              <li>
                Supported user provisioning, access control, and configuration of profiles,
                permission sets, and roles.
              </li>
              <li>
                Provided UAT and production support, triaging defects and ensuring smooth
                deployments using Git and Salesforce CLI.
              </li>
              <li>
                Mentored junior developers, conducted code reviews, and upheld best practices in
                Apex and LWC development.
              </li>
            </ul>
            <div class="tech-stack">
              <span class="tech-tag">APEX</span>
              <span class="tech-tag">REST & SOAP</span>
              <span class="tech-tag">Salesforce Administration</span>
              <span class="tech-tag">Omnistudio</span>
              <span class="tech-tag">LWC & Aura & Visualforce</span>
              <span class="tech-tag">DevOps / Salesforce CLI</span>
              <span class="tech-tag">Flows & Process Builder</span>
              <span class="tech-tag">Business Analysis</span>
            </div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-date">November 2023 - February 2024</div>
            <h2>Primary Teaching Assistant</h2>
            <h3>Faculty of Information and Communication Technologies – Bitola</h3>
            <p>C++ Programming</p>
            <ul>
              <li>
                Led practical labs for C++ fundamentals, supporting beginner students with
                algorithmic problem-solving and clean code practices.
              </li>
              <li>
                Designed and graded assignments while providing 1:1 guidance and live debugging
                sessions.
              </li>
            </ul>
            <div class="tech-stack">
              <span class="tech-tag">C++</span>
              <span class="tech-tag">Teaching</span>
              <span class="tech-tag">Algorithms</span>
              <span class="tech-tag">Mentoring</span>
              <span class="tech-tag">Grading</span>
              <span class="tech-tag">Teaching</span>
              <span class="tech-tag">CodeBlocks</span>
            </div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-date">June 2024 - August 2024</div>
            <h2>Tableau Integration with Piwik Pro</h2>
            <h3>Avenga</h3>
            <p>Data Visualization Project</p>
            <ul>
              <li>
                Built a Web Data Connector to import analytics from Piwik PRO into Tableau for
                dynamic reporting.
              </li>
              <li>Prepared and transformed datasets for visualization and insights delivery.</li>
            </ul>
            <div class="tech-stack">
              <span class="tech-tag">Tableau</span>
              <span class="tech-tag">Data Visualization</span>
              <span class="tech-tag">Piwik Pro</span>
              <span class="tech-tag">Analytics</span>
            </div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-date">May 2024 - November 2024</div>
            <h2>Piwik Pro Connector for Salesforce</h2>
            <h3>Avenga</h3>
            <p>Integration Development</p>
            <ul>
              <li>
                Built a custom Salesforce connector to integrate Piwik PRO using REST APIs,
                improving analytics and user tracking.
              </li>
              <li>
                Designed efficient SOQL queries and dashboards for actionable reporting inside
                Salesforce.
              </li>
              <li>
                Handled deployment across orgs and implemented custom components using LWC and Apex.
              </li>
            </ul>
            <div class="tech-stack">
              <span class="tech-tag">APEX</span>
              <span class="tech-tag">REST</span>
              <span class="tech-tag">Salesforce Administration</span>
              <span class="tech-tag">Salesforce CLI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSEO, pagesSEO } from '@/composables'
useSEO(pagesSEO.experience)
</script>

<style scoped>
.experience {
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
  margin-bottom: 3rem;
  color: #333;
  text-align: center;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 7px;
  width: 2px;
  background-color: #41b883;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #41b883;
  border: 2px solid white;
  top: 5px;
}

.timeline-content {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.timeline-date {
  display: inline-block;
  background-color: #41b883;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  color: #333;
}

h3 {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 1rem;
  font-style: italic;
}

ul {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background-color: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #555;
}

@media (max-width: 768px) {
  .timeline-content {
    padding: 1rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  h3 {
    font-size: 1rem;
  }
}
</style>
