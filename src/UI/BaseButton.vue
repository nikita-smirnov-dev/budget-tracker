<script setup lang="ts"></script>

<template>
  <button class="base-button btn-reset">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  color: var(--main-text-color);
  background: var(--accent-color);
  transition: background 0.3s ease-in-out;
}

.base-button:hover {
  background: var(--hover-color);
}
.base-button:active {
  background: var(--active-color);
}
</style>
