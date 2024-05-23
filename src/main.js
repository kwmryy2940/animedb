import { createApp } from "vue";
import App from "./App.vue";

// Vuetify のインポートを追加 **********/
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure your project is capable of handling css files
import { aliases, fa } from "vuetify/iconsets/fa";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
});

const app = createApp(App);
app.use(vuetify);
app.mount("#app");
