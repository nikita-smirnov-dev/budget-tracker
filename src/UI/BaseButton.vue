<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    variantAction?: 'primary' | 'secondary' | 'icon';
  }>(),
  {
    disabled: false,
    variantAction: 'primary',
  },
);
</script>

<template>
  <button
    class="base-button btn-reset"
    :class="`base-button--${props.variantAction}`"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  color: var(--main-text-color);
  transition: background 0.3s ease-in-out;
}

.base-button--primary {
  padding: 10px 20px;
  background: var(--accent-color);
}
.base-button--primary:hover {
  background: var(--hover-color);
}
.base-button--primary:active {
  background: var(--active-color);
}

.base-button--secondary {
  padding: 0;
  background: transparent;
}

.base-button--icon {
  padding: 0;
  background: transparent;
  border-radius: 50%;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #555555;
}
</style>
