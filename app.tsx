import Gtk from "gi://Gtk?version=4.0";
import app from "ags/gtk4/app";
import { Astal } from "ags/gtk4";
import { Main, getStyles } from "./src";

app.start({
  css: `
    ${getStyles()}
    .app__window {
      background-color: black;
      background-image: url("file://${BACKGROUND_IMAGE}");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      color: black;
      font-family: "${FONT_FAMILY}";
    }
    .app__window__content {
      margin: 4rem 12rem;
      border: 4px solid red;
    }
  `,
  instanceName: "deck-ui",
  main() {
    return (
      <window
        $={(self) => self.connect("map", self.present)}
        anchor={
          Astal.WindowAnchor.BOTTOM |
          Astal.WindowAnchor.LEFT |
          Astal.WindowAnchor.RIGHT |
          Astal.WindowAnchor.TOP
        }
        application={app}
        class="app__window"
        keymode={Astal.Keymode.ON_DEMAND}
        visible
      >
        <box class="app__window__content">
          <Main />
        </box>
      </window>
    );
  },
});
