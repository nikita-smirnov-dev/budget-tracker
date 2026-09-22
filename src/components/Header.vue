<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="container header__container">
      <a href="#" class="header__logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 19l16 0" />
          <path d="M4 15l4 -6l4 2l4 -5l4 4" />
        </svg>
        МойБюджет
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 20px 0;
  border-bottom: 1px solid #b4b4b4;
}

.header__logo {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  color: var(--secondary-text-color);
}

.header__logo svg {
  width: 40px;
  height: 40px;
  margin-right: 5px;
  stroke: currentcolor;
}
</style>
