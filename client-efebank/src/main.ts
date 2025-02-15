import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "../src/plugins/vuetify"; 
import "./assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(vuetify);

app.mount("#app");
