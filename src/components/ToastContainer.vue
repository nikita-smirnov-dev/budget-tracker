<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore';
import BaseToast from '@/UI/BaseToast.vue';

const toastStore = useToastStore();
</script>

<template>
  <div class="toast">
    <ul class="toast__list list-reset">
      <li
        class="toast__item"
        v-for="toast in toastStore.toasts"
        :key="toast.id"
      >
        <BaseToast v-bind="toast" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.toast__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
