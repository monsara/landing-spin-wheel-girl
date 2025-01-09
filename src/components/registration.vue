<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getRegistrationFields,
  getUserGeo,
  getCountries,
  getCurrencies,
  getLocales
} from '@/api/registration'
import type {
  ICountry,
  ICurrency,
  ILocale,
  IField,
  ISelectOption
} from "@/types"
import RegistrationForm from '@/components/forms/registration-form.vue'

const fields = ref<IField[]>([])
const geoCountry = ref<string|undefined>()
const countries = ref<ICountry[]>([])
const selectOptions = ref<{
  country: ISelectOption[];
  currency: ISelectOption[];
  locale: ISelectOption[];
}>({
  country: [],
  currency: [],
  locale: []
})

const getFormSettings = async ():Promise<void> => {
  try {
    const [
      fieldsResponse,
      geoResponse,
      countriesResponse,
      currenciesResponse,
      localesResponse
    ]: [
      { data: IField[] },
      { data: { country: string } },
      { data: ICountry[] },
      { data: ICurrency[] },
      { data: ILocale[] }
    ] = await Promise.all([
      getRegistrationFields(),
      getUserGeo(),
      getCountries(),
      getCurrencies(),
      getLocales()
    ])

    fields.value = fieldsResponse.data
    geoCountry.value = geoResponse.data.country
    countries.value = countriesResponse.data
    selectOptions.value = {
      country: countriesResponse.data.map(country => ({ id: country.code, label: country.name })),
      currency: currenciesResponse.data.map(currency => ({ id: currency.code, label: currency.code })),
      locale: localesResponse.data.map(locale => ({ id: locale.code, label: locale.nativeName || locale.name }))
    }
  } catch {
    console.error('Registration fields not loaded!')
  }
}

onMounted(() => {
  getFormSettings()
})
</script>

<template>
  <div class="registration">
    <transition name="fade" mode="out-in">
      <div v-if="fields.length" class="registration__content">
        <RegistrationForm
          :fields="fields"
          :geoCountry="geoCountry"
          :countries="countries"
          :selectOptions="selectOptions"
        />
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.registration {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100%;
  background-color: var(--vt-c-white-mute);

  &__content {
    width: 400px;
    padding: 1rem;
    border-radius: 20px;
    border: 2px solid var(--vt-c-divider-dark-1);
    box-shadow: 5px 5px 5px var(--vt-c-divider-dark-2);
    max-height: 80vh;
    overflow: auto;
    background-color: var(--vt-c-white);
  }
}
</style>