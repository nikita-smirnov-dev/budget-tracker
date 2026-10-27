<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variantAction?: 'primary' | 'secondary' | 'icon';
  }>(),
  {
    disabled: false,
    variantAction: 'primary',
    type: 'button',
  },
);
</script>

<template>
  <button
    class="base-button btn-reset"
    :type="type"
    :class="`base-button--${variantAction}`"
    :disabled="disabled"
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
  color: #ffffff;
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
