import {createApp} from "vue";
import {createPinia} from "pinia";

import App from "./App.vue";
import router from "./router";

// primevue css
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";

//prime theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
//prime component
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component("Button", Button);
app.component("Card", Card);
app.component("InputText", InputText);
app.component("Toast", Toast);
app.component("Menubar", Menubar);
app.component("Dialog", Dialog);
app.component("Dropdown", Dropdown);
app.component("Calendar", Calendar);

app.mount("#app");
