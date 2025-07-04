import vuetify from "./vuetify";
import router from "../router/index";

import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(vuetify).use(router);
}
