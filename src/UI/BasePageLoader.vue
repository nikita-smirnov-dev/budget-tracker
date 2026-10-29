<script setup lang="ts"></script>

<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 20px solid rgba(255, 255, 255, 0.1);
  border-top: 20px solid #6366f1;
  border-right: 20px solid #8b5cf6;
  animation: rotate 1s linear infinite;
  border-width: 15px;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
