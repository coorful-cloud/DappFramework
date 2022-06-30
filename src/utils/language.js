import { createI18n } from 'vue-i18n'
import messages from '@/config/language'

let lang = localStorage.getItem('lang') || navigator.language || 'en-US'
if(!messages[lang]){
    lang = 'en-US'
}
localStorage.setItem('lang', lang)
const i18n = createI18n({
    locale: localStorage.getItem('lang'),
    fallbackLocale: 'en-US',
    messages,
})

// reset vant language
import { Locale } from 'vant'
const data = require('vant/es/locale/lang/' + lang).default
Locale.use(lang, data)

export default i18n
