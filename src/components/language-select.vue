<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" })
</script>

<template>
  <select v-model="locale" class="language-select">
    <option value="en">EN</option>
    <option value="ua">UA</option>
  </select>
</template>