<template>
  <div class="stats-card" :style="{ background: color }">
    <div>
      <span class="stats-value">{{ value || 0 }}</span>
      <span class="stats-label">{{ label }}</span>
    </div>
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" :d="iconPath" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'StatsCard',
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    iconPath: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.stats-card {
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.stats-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 25px rgba(67, 56, 202, 0.35);
}

.stats-card > div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stats-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  animation: fadeInUp 0.6s ease forwards;
}

.stats-label {
  font-size: 0.875rem;
  opacity: 0.85;
}

.icon {
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  opacity: 0.96;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>