import { createI18n } from 'vue-i18n'
import messages from '@/config/language'

const language = (navigator.language || 'en').toLocaleLowerCase()
const lang = localStorage.getItem('lang') || language.split('-')[0] || 'en'
localStorage.setItem('lang', lang)
const i18n = createI18n({
    locale: localStorage.getItem('lang'),
    fallbackLocale: 'en',
    messages,
})

export default i18n
