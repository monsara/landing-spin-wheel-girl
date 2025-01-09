<script setup lang="ts">
import type {ICountry, IField, ISelectOption} from "@/types"
import { defineAsyncComponent, reactive, ref, Ref } from "vue";
import CheckboxInput from '@/components/forms/inputs/checkbox-input.vue'
import FieldsComponents from '@/components/forms/fields-components.json'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@/translations/validation-rules'
import {registerUser} from "@/api/registration";
import { useI18n } from "vue-i18n";

const DynamicComponents = {
  'TextInput': defineAsyncComponent(() => import('@/components/forms/inputs/text-input.vue')),
  'SelectInput': defineAsyncComponent(() => import('@/components/forms/inputs/select-input.vue')),
  'DateInput': defineAsyncComponent(() => import('@/components/forms/inputs/date-input.vue')),
  'CheckboxInput': defineAsyncComponent(() => import('@/components/forms/inputs/checkbox-input.vue'))
}

const props = defineProps<{
  fields: IField[];
  geoCountry: string;
  countries: ICountry[];
  selectOptions: {
    country: ISelectOption[];
    currency: ISelectOption[];
    locale: ISelectOption[];
  }
}>()

const { t } = useI18n()
const groupFooterFields = ['agreements', 'receiveEmailPromo', 'receiveSmsPromo']
const selectOptions = {
  gender: [
    {
      id: 'male',
      label: 'Male'
    },
    {
      id: 'female',
      label: 'Female'
    },
    {
      id: 'other',
      label: 'Other'
    }
  ],
  ...props.selectOptions
}

const formData = reactive<Record<string, any>>({})
const rules = {
  email: { email }
}
const serverFormErrors = ref<any>();

props.fields.forEach((field) => {
  const geoCountryData = props.countries.find(country => country.code === props.geoCountry)

  if (field.name === 'country') {
    formData[field.name] = geoCountryData?.code
  } else if (field.name === 'currency') {
    formData[field.name] = geoCountryData?.currency
  } else if (field.name === 'locale') {
    formData[field.name] = geoCountryData?.locale
  } else formData[field.name] = undefined

  if (field.isRequired) rules[field.name] = { ...rules[field.name], required }
})

// @ts-ignore
const v$:Ref<any> = useVuelidate(rules, formData)
const mainFields = props.fields.filter((field) => !groupFooterFields.includes(field.name))
const footerFields = props.fields.filter((field) => groupFooterFields.includes(field.name))

const changeInput = (fieldName: string):void => {
  if (serverFormErrors.value?.[fieldName]) {
    serverFormErrors.value = { ...serverFormErrors.value, [fieldName]: undefined }
  }
  v$.value[fieldName]?.$touch()
}

const isProcessing = ref<boolean>(false)
const registration = async ():Promise<void> => {
  if (isProcessing.value) return

  const validFormData = await v$.value.$validate()
  if (!validFormData) return

  const searchParams = new URLSearchParams(window.location.search);
  const affiliateTag = searchParams.get('stag');
  if (affiliateTag) formData.affiliateTag = affiliateTag

  try {
    isProcessing.value = true
    const { data } = await registerUser(formData)

    const currentQuery = window.location.search
    const redirectQuery = currentQuery ? `${currentQuery}&state=${data.autologinToken}` : `?state=${data.autologinToken}`
    window.location.replace(`${import.meta.env.VITE_REDIRECT_URL}/auth/autologin${redirectQuery}`)
  } catch (error:any) {
    if (error.response?.status === 422) {
      serverFormErrors.value = error.response?.data?.error?.fields;
    } else throw error;
  } finally {
    isProcessing.value = false;
  }
}
</script>

<template>
  <form class="form-registration">
    <template v-for="field in mainFields" :key="field.name">
      <component
        :is="DynamicComponents[FieldsComponents[field.name]] || DynamicComponents['TextInput']"
        v-model:value="formData[field.name]"
        :label="t(`registration.labels.${field.name}`)"
        :name="field.name"
        :placeholder="t(`registration.placeholders.${field.name}`)"
        :options="selectOptions[field.name]"
        :isRequired="field.isRequired"
        :error="v$[field.name]?.$errors?.[0]?.$message || serverFormErrors?.[field.name]?.[0]"
        @change="changeInput(field.name)"
      />
    </template>

    <CheckboxInput
      v-for="field in footerFields"
      v-model:value="formData[field.name]"
      :key="field.name"
      :name="field.name"
      :isRequired="field.isRequired"
      :label="t(`registration.labels.${field.name}`)"
      :error="v$[field.name]?.$errors?.[0]?.$message || serverFormErrors?.[field.name]?.[0]"
      @change="changeInput(field.name)"
    />

    <button
      class="form-registration__submit-btn"
      type="submit"
      @click.prevent="registration"
    >
      {{ t('registration.submitButton') }}
    </button>
  </form>
</template>

<style lang="scss">
.form-registration {
  &__submit-btn {
    display: block;
    height: 40px;
    width: 100%;
    margin: 20px auto 0;
    border-radius: 20px;
    border: 1px solid var(--vt-c-divider-dark-1);
    cursor: pointer;
  }
}
</style>