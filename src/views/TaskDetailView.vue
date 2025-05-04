<!-- src/views/TaskDetailView.vue -->
<template>
  <div class="task-detail">
    <div class="container">
      <!-- Loading state -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading task details...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error-state">
        <div class="error-icon">!</div>
        <h2>Something went wrong</h2>
        <p>{{ error }}</p>
        <button @click="fetchTask" class="retry-button">Try again</button>
        <router-link to="/tasks" class="back-button">Back to all tasks</router-link>
      </div>

      <!-- Task not found state -->
      <div v-else-if="!task" class="not-found-state">
        <h2>Task not found</h2>
        <p>The task you're looking for doesn't seem to exist.</p>
        <router-link to="/tasks" class="back-button">Back to all tasks</router-link>
      </div>

      <!-- Task content -->
      <div v-else class="task-container">
        <div class="task-header">
          <div class="task-meta-top">
            <span
              :class="['status-badge', `status-${task.status.toLowerCase().replace(' ', '-')}`]"
            >
              {{ task.status }}
            </span>
            <span :class="['priority-badge', `priority-${task.priority.toLowerCase()}`]">
              {{ task.priority }}
            </span>
            <span :class="['severity-badge', `severity-${task.severity.toLowerCase()}`]">
              {{ task.severity }}
            </span>
          </div>

          <h1 class="task-title">{{ task.title }}</h1>

          <div class="task-submeta">
            <div class="task-created">
              <strong>Created:</strong> {{ formatDate(task.createdAt) }}
            </div>
            <div class="task-updated" v-if="task.updatedAt !== task.createdAt">
              <strong>Updated:</strong> {{ formatDate(task.updatedAt) }}
            </div>
            <div class="task-due" v-if="task.dueDate">
              <strong>Due:</strong> {{ formatDate(task.dueDate) }}
            </div>
          </div>
        </div>

        <div class="task-body">
          <div class="task-details">
            <div class="detail-row">
              <div class="detail-label">Assignee:</div>
              <div class="detail-value">{{ task.assignee?.username || 'Unassigned' }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Author:</div>
              <div class="detail-value">{{ task.author?.username || 'Unknown' }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Estimation:</div>
              <div class="detail-value">{{ task.estimation }} hours</div>
            </div>
            <div class="detail-row" v-if="task.completedAt">
              <div class="detail-label">Completed:</div>
              <div class="detail-value">{{ formatDate(task.completedAt) }}</div>
            </div>
          </div>

          <div class="task-labels" v-if="task.labels && task.labels.length">
            <h3>Labels</h3>
            <div class="labels-container">
              <span v-for="(label, index) in task.labels" :key="index" class="task-label">
                {{ label }}
              </span>
            </div>
          </div>

          <div class="task-description">
            <h3>Description</h3>
            <div class="description-content">
              {{ task.description }}
            </div>
          </div>

          <div class="task-comments" v-if="task.comments && task.comments.length">
            <h3>Comments ({{ task.comments.length }})</h3>
            <div class="comments-list">
              <div v-for="(comment, index) in task.comments" :key="index" class="comment">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.user }}</span>
                  <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
                </div>
                <div class="comment-content">
                  {{ comment.comment }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="task-footer">
          <router-link to="/tasks" class="back-link">← Back to all tasks</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/TaskStore'

const route = useRoute()
const taskStore = useTaskStore()
const taskId = route.params.id as string

const loading = computed(() => taskStore.loading)
const error = computed(() => taskStore.error)
const task = computed(() => taskStore.currentTask)

const fetchTask = async () => {
  try {
    await taskStore.fetchTaskById(taskId)
  } catch (error) {
    console.error('Error fetching task:', error)
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'

  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(() => {
  fetchTask()
})
</script>

<style scoped>
.task-detail {
  padding: 3rem 0;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Loading state */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(65, 184, 131, 0.1);
  border-radius: 50%;
  border-top-color: #41b883;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error state */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 99, 71, 0.05);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.error-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 99, 71, 0.1);
  color: tomato;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.retry-button,
.back-button,
.submit-button {
  padding: 0.5rem 1.5rem;
  background-color: #41b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-block;
  margin-top: 1rem;
}

.retry-button:hover,
.back-button:hover,
.submit-button:hover {
  background-color: #349268;
}

.back-button {
  background-color: #6c757d;
  margin-left: 1rem;
}

.back-button:hover {
  background-color: #5a6268;
}

/* Not found state */
.not-found-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

/* Task container */
.task-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.task-header {
  padding: 2rem;
  border-bottom: 1px solid #eee;
  background-color: #fcfcfc;
}

.task-meta-top {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.status-badge,
.priority-badge,
.severity-badge {
  padding: 0.3rem 1rem;
  border-radius: 15px;
  font-size: 0.85rem;
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

.task-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  line-height: 1.3;
}

.task-submeta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.task-body {
  padding: 2rem;
}

.task-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.9rem;
  color: #666;
}

.detail-value {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}

.task-labels {
  margin-bottom: 2rem;
}

.task-labels h3,
.task-description h3,
.task-comments h3,
.add-comment h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.labels-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.task-label {
  background-color: #f0f8f4;
  color: #41b883;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
}

.task-description {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.description-content {
  line-height: 1.7;
  color: #333;
  white-space: pre-line;
}

.task-comments {
  margin-bottom: 2rem;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.comment-author {
  font-weight: 600;
  color: #333;
}

.comment-date {
  font-size: 0.85rem;
  color: #777;
}

.comment-content {
  line-height: 1.5;
  color: #333;
}

.add-comment {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #41b883;
}

.submit-button {
  padding: 0.75rem 1.5rem;
  margin-top: 0;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.task-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #eee;
  background-color: #fcfcfc;
}

.back-link {
  color: #41b883;
  text-decoration: none;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .task-meta-top {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .task-title {
    font-size: 1.5rem;
  }

  .task-submeta {
    flex-direction: column;
    gap: 0.75rem;
  }

  .task-details {
    grid-template-columns: 1fr;
  }
}
</style>
