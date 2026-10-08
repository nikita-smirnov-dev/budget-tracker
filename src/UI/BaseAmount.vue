<script setup lang="ts">
import type { CurrencyType } from '@/types/currencyTypes';
import { formatBalance } from '@/utils/formatBalance';
import { MdCurrencyRuble } from '@kalimahapps/vue-icons';
import { GvUsd } from '@kalimahapps/vue-icons';
import { BxEuro } from '@kalimahapps/vue-icons';
import { BsCurrencyYen } from '@kalimahapps/vue-icons';

const props = withDefaults(
  defineProps<{
    value: Number;
    currency: CurrencyType;
  }>(),
  {
    currency: 'RUB',
  },
);
</script>

<template>
  <div class="base-amount">
    {{ formatBalance(value as number) }}
    <template v-if="props.currency === 'RUB'">
      <MdCurrencyRuble class="base-amount__svg" />
    </template>
    <template v-else-if="props.currency === 'USD'">
      <GvUsd class="base-amount__svg" />
    </template>
    <template v-else-if="props.currency === 'EUR'">
      <BxEuro class="base-amount__svg" />
    </template>
    <template v-else-if="props.currency === 'CNY'">
      <BsCurrencyYen class="base-amount__svg" />
    </template>
  </div>
</template>

<style scoped>
.base-amount {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.base-amount__svg {
  display: flex;
  width: 1em;
  height: 1em;
  color: currentcolor;
}
</style>
