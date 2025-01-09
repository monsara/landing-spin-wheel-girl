<script setup lang="ts">
const props = defineProps<{
  value: boolean|undefined;
  name: string;
  label: string;
  isRequired?: boolean;
  error?: string;
}>()

const emit = defineEmits(['update:value', 'change']);
const onInput = (e:any) => {
  const checkboxValue = props.isRequired ? (e.target.checked || undefined) : e.target.checked;
  emit('update:value', checkboxValue);
  emit('change', checkboxValue);
}
</script>

<template>
  <div class="checkbox-input" :class="{ 'checkbox-input--error': props.error }">
    <div class="checkbox-input__content">
      <input
        :id="props.name"
        type="checkbox"
        :checked="props.value"
        :required="props.isRequired"
        :name="props.name"
        @change="onInput"
      >
      <label :for="props.name" v-html="props.label" /><span v-if="props.isRequired">*</span>
    </div>

    <div v-if="props.error" class="input-error">
      {{ props.error }}
    </div>
  </div>
</template>

<style lang="scss">
.checkbox-input {
  margin-bottom: 10px;

  label {
    margin-left: 10px;
  }

  input {
    transform: translateY(1px);
  }
}
</style>