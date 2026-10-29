<script setup lang="ts"></script>

<template>
  <div class="data-loader">
    <div class="data-loader__spinner"></div>
  </div>
</template>

<style scoped>
.data-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.data-loader__spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 20px solid rgba(255, 255, 255, 0.1);
  border-top: 20px solid #6366f1;
  border-right: 20px solid #8b5cf6;
  border-width: 3px;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
