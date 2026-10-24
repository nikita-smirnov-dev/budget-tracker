import { computed, ref } from 'vue';

export const useFormValidation = (state: () => boolean) => {
  const isSubmitted = ref(false);

  const isFormInvalid = computed(() => state());

  return { isFormInvalid, isSubmitted };
};
