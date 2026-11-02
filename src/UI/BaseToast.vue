<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore';
import type { IToast } from '@/types/toastTypes';
import BaseButton from '@/UI/BaseButton.vue';

import { MdClose } from '@kalimahapps/vue-icons';

const props = defineProps<IToast>();

const toastStore = useToastStore();
</script>

<template>
  <div
    class="toast__info"
    :class="
      type === 'success' ? 'toast__info--bg-success' : 'toast__info--bg-error'
    "
  >
    <span class="toast__text">{{ message }}</span>
    <BaseButton
      type="button"
      class="toast__btn btn-reset"
      variant-action="icon"
      aria-label="Удалить уведомление"
      @click="toastStore.removeToast(props.id)"
    >
      <MdClose class="toast__icon-delete" aria-hidden="true" />
    </BaseButton>
  </div>
</template>

<style scoped>
.toast__info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 8px;
}

.toast__info--bg-success {
  background: var(--color-success);
}

.toast__info--bg-error {
  background: var(--color-error);
}
</style>
