import { registerPlugins } from "@/plugins";
import App from "./App.vue";
import { createApp } from "vue";
import "unfonts.css";
import "./index.css";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
