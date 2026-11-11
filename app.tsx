import app from "ags/gtk4/app";
import { Router } from "./src";

app.start({
  instanceName: "deck-ui",
  main() {
    return <Router application={app} />;
  },
});
