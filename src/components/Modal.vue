<script setup lang="ts">
import { MdClose } from '@kalimahapps/vue-icons';
import BaseButton from '@/UI/BaseButton.vue';
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  document.body.classList.add('stop-scroll');
});

onUnmounted(() => {
  document.body.classList.remove('stop-scroll');
});
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay">
      <div class="modal-content">
        <slot />
        <BaseButton
          class="modal-close"
          variant-action="secondary"
          aria-label="Закрыть модальное окно"
          @click="$emit('close')"
        >
          <MdClose class="modal-close__icon" aria-hidden="true" />
        </BaseButton>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 100;
}

.modal-content {
  position: relative;
  padding: 0 20px;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: absolute;
  top: 8px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: var(--color-white);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.modal-close__icon {
  width: 30px;
  height: 30px;
  color: var(--color-black);
}
</style>
