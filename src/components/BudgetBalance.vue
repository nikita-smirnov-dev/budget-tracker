<script setup lang="ts">
const props = defineProps({
  total: Number,
});
</script>

<template>
  <div class="budget-balance card">
    <h1 class="budget-balance__title">Ваш Баланс</h1>
    <span class="budget-balance__info" data-balance>{{ total }} рублей</span>
  </div>
</template>

<style scoped>
.budget-balance__title {
  margin: 0;
}

.budget-balance__info {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 1.4rem;
  font-weight: bold;
}
</style>
