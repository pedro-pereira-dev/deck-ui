import app from "ags/gtk4/app";
import { Main, Styles } from "./src";

app.start({
  css: Styles,
  instanceName: "deck-ui",
  main() {
    return <Main application={app} />;
  },
});
