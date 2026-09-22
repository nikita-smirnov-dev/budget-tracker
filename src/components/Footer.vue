<script setup lang="ts">
const yearElement = document.querySelector('[data-current-year]');

if (yearElement) yearElement.textContent = new Date().getFullYear().toString();
</script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <p class="footer__text section-text">
        &copy;&nbsp;<span data-current-year>2026</span> &bull; МойБюджет
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer__text {
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--secondary-text-color);
  opacity: 0.7;
}
</style>
