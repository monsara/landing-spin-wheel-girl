import { createI18n } from 'vue-i18n'
import en from './en.json'
import ua from './ua.json'

const i18n:any = createI18n({
  locale: 'en',
  legacy: false,
  fallbackLocale: 'en',
  messages: { en, ua }
})

export default i18n
