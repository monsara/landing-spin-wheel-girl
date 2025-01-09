<script setup lang="ts">
const props = defineProps<{
  value: string|undefined;
  name: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  options: { id: string, label: string }[];
  error?: string;
}>()

const emit = defineEmits(['update:value', 'change']);
const onChange = (e:any) => {
  emit('update:value', e.target.value);
  emit('change');
}
</script>

<template>
  <div class="select-input" :class="{ 'select-input--error': props.error }">
    <label :for="props.name">
      {{ props.label }}<span v-if="props.isRequired">*</span>
    </label>

    <select
      :id="props.name"
      :value="props.value"
      :required="props.isRequired"
      :name="props.name"
      @change="onChange"
    >
      <option value="" disabled selected hidden>{{ props.placeholder }}</option>
      <option
        v-for="option in props.options"
        :value="option.id"
      >
        {{ option.label }}
      </option>
    </select>

    <div v-if="props.error" class="input-error">
      {{ props.error }}
    </div>
  </div>
</template>

<style lang="scss">
.select-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  select {
    width: 100%;
    height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    border: 1px solid var(--vt-c-divider-dark-2);
  }

  &--error {
    select {
      border: 1px solid var(--vt-c-error);
    }
  }
}
</style>