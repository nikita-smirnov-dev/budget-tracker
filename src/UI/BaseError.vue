<script setup lang="ts">
const props = defineProps<{
  message: string | null;
}>();
</script>

<template>
  <div class="error">
    <p class="error__message">{{ message }}</p>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error__message {
  margin: 0;
  margin-bottom: 20px;
}
</style>
