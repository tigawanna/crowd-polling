/* eslint-disable no-var */
import { startClient } from "rakkasjs/client";

startClient({
  hooks: {
    beforeStart() {
      // Do something before starting the client
    },

    wrapApp(app) {
      return app;
    },
  },
});
