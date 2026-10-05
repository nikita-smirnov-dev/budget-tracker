<script setup lang="ts"></script>

<template>
  <div class="radio-group" aria-labelledby="group-type">
    <slot></slot>
  </div>
</template>

<style scoped>
.radio-group {
  display: grid;
  margin-bottom: 20px;
  background: var(--surface-color);
}
</style>
