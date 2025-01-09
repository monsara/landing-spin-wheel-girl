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

const fieldTypes = {
  password: 'password',
  email: 'email'
}
</script>

<template>
  <div class="text-input" :class="{ 'text-input--error': props.error }">
    <label :for="props.name">
      {{ props.label }}<span v-if="props.isRequired">*</span>
    </label>

    <input
      :id="props.name"
      :type="fieldTypes[props.name] || 'text'"
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
.text-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  input {
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