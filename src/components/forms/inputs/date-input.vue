<script setup lang="ts">
const props = defineProps<{
  value: string|undefined;
  name: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  error?: string;
}>()

const emit = defineEmits(['update:value', 'change']);
const onInput = (e:any) => {
  emit('update:value', e.target.value);
}
</script>

<template>
  <div class="date-input" :class="{ 'date-input--error': props.error }">
    <label :for="props.name">
      {{ props.label }}<span v-if="props.isRequired">*</span>
    </label>

    <input
      :id="props.name"
      type="date"
      :value="props.value"
      :required="props.isRequired"
      :placeholder="props.placeholder"
      :name="props.name"
      @input="onInput"
      @change="emit('change')"
    >

    <div v-if="props.error" class="input-error">
      {{ props.error }}
    </div>
  </div>
</template>

<style lang="scss">
.date-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  input {
    width: 100%;
    height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    border: 1px solid var(--vt-c-divider-dark-2);
  }

  &--error {
    input {
      border: 1px solid var(--vt-c-error);
    }
  }
}
</style>