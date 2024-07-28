import { defineCustomElement } from 'vue'
import App from './App.vue'

const MyCalendar = defineCustomElement(App)

customElements.define('my-calendar', MyCalendar)
