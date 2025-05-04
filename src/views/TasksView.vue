<template>
  <div class="tasks">
    <div class="container">
      <h1>TODOs & Tasks</h1>
      <p class="intro">Track and manage tasks that I'm currently working on</p>

      <div class="filters">
        <div class="filter-group">
          <label for="sortBy">Sort by:</label>
          <select id="sortBy" v-model="sortBy" @change="applyFilters">
            <option value="createdAt">Created Date</option>
            <option value="priority">Priority</option>
            <option value="severity">Severity</option>
            <option value="estimation">Estimation</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="sortOrder">Order:</label>
          <select id="sortOrder" v-model="sortOrder" @change="applyFilters">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="statusFilter">Status:</label>
          <select id="statusFilter" v-model="statusFilter" @change="applyFilters">
            <option value="">All</option>
            <option value="TO DO">To Do</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
            <option value="BLOCKED">Blocked</option>
            <option value="REVIEW">Review</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="priorityFilter">Priority:</label>
          <select id="priorityFilter" v-model="priorityFilter" @change="applyFilters">
            <option value="">All</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="loading">
        <p>Loading tasks...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchTasks" class="btn">Try Again</button>
      </div>

      <!-- No tasks state -->
      <div v-else-if="tasks.length === 0" class="no-tasks">
        <p>No tasks available based on current filters.</p>
      </div>

      <!-- Tasks grid -->
      <div v-else class="tasks-grid">
        <div v-for="task in tasks" :key="task._id" class="task-card">
          <div class="task-header">
            <span
              :class="['status-badge', `status-${task.status.toLowerCase().replace(' ', '-')}`]"
            >
              {{ task.status }}
            </span>
            <span :class="['priority-badge', `priority-${task.priority.toLowerCase()}`]">
              {{ task.priority }}
            </span>
          </div>

          <h3 class="task-title">{{ task.title }}</h3>

          <div class="task-meta">
            <span class="task-estimation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {{ task.estimation }} hrs
            </span>
            <span class="task-severity" :class="`severity-${task.severity.toLowerCase()}`">
              {{ task.severity }}
            </span>
          </div>

          <p class="task-description">{{ truncateDescription(task.description) }}</p>

          <div class="task-footer">
            <div class="task-assignee">
              <span class="assignee-label">Assignee:</span>
              <span class="assignee-name">{{ task.assignee?.username || 'Unassigned' }}</span>
            </div>

            <div class="task-date">
              {{ formatDate(task.createdAt) }}
            </div>
          </div>

          <div class="task-labels" v-if="task.labels && task.labels.length">
            <span v-for="(label, i) in task.labels" :key="i" class="task-label">{{ label }}</span>
          </div>

          <router-link :to="`/tasks/${task._id}`" class="view-task-link">
            View Details →
          </router-link>
        </div>
      </div>

      <!-- Pagination (to be implemented later) -->
      <div class="pagination">
        <!-- Pagination controls will go here -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'

const taskStore = useTaskStore()

// Filter and sort state
const sortBy = ref('createdAt')
const sortOrder = ref('desc')
const statusFilter = ref('')
const priorityFilter = ref('')

// Computed properties
const tasks = computed(() => taskStore.tasks)
const loading = computed(() => taskStore.loading)
const error = computed(() => taskStore.error)

// Methods
const fetchTasks = async () => {
  await taskStore.fetchTasks({
    sort: sortBy.value,
    order: sortOrder.value as 'asc' | 'desc',
    status: statusFilter.value,
    priority: priorityFilter.value,
  })
}

const applyFilters = () => {
  fetchTasks()
}

const truncateDescription = (description: string, maxLength = 100) => {
  if (description.length <= maxLength) return description
  return description.slice(0, maxLength) + '...'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Initialize data
onMounted(() => {
  fetchTasks()
})
</script>

<style scoped>
.tasks {
  padding: 3rem 0;
}

.container {
  max-width: 1200px;
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
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.filter-group label {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: #555;
  font-weight: 500;
}

.filter-group select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 0.9rem;
}

.loading,
.error,
.no-tasks {
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #41b883;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #349268;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.task-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.status-badge,
.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-to-do {
  background-color: #e0f0ff;
  color: #0066cc;
}

.status-in-progress {
  background-color: #fff0e0;
  color: #ff9900;
}

.status-done {
  background-color: #e0ffe0;
  color: #00cc66;
}

.status-blocked {
  background-color: #ffe0e0;
  color: #cc0000;
}

.status-review {
  background-color: #f0e0ff;
  color: #6600cc;
}

.priority-low {
  background-color: #e0ffe0;
  color: #00cc66;
}

.priority-medium {
  background-color: #e0f0ff;
  color: #0066cc;
}

.priority-high {
  background-color: #fff0e0;
  color: #ff9900;
}

.priority-critical {
  background-color: #ffe0e0;
  color: #cc0000;
}

.task-title {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: #333;
  font-weight: 600;
  line-height: 1.4;
}

.task-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.task-estimation {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #666;
}

.task-severity {
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.severity-minor {
  background-color: #e8f5e9;
  color: #388e3c;
}

.severity-major {
  background-color: #fff3e0;
  color: #f57c00;
}

.severity-critical {
  background-color: #ffebee;
  color: #d32f2f;
}

.severity-blocker {
  background-color: #880e4f;
  color: white;
}

.task-description {
  margin-bottom: 1.5rem;
  color: #555;
  line-height: 1.5;
  flex-grow: 1;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  margin-bottom: 1rem;
}

.task-assignee {
  font-size: 0.9rem;
}

.assignee-label {
  color: #666;
}

.assignee-name {
  font-weight: 600;
  color: #333;
}

.task-date {
  font-size: 0.85rem;
  color: #888;
}

.task-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.task-label {
  background-color: #f0f8f4;
  color: #41b883;
  padding: 0.15rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

.view-task-link {
  display: inline-block;
  color: #41b883;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  margin-top: 0.5rem;
}

.view-task-link:hover {
  text-decoration: underline;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 0.75rem;
  }

  .tasks-grid {
    grid-template-columns: 1fr;
  }

  .task-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .task-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
