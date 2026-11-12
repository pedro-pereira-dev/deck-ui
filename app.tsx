import app from "ags/gtk4/app";
import { Astal } from "ags/gtk4";
import { Main, Styles } from "./src";

app.start({
  css: `
    ${Styles}
    .app__window {
      background-color: black;
      background-image: url("file://${BACKGROUND_IMAGE}");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      font-family: "${FONT_FAMILY}";
    }
    .app__window__content {
      background-color: lightblack;
      border: solid .1rem white;
      margin: 4rem;
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
        <overlay hexpand vexpand>
          <box
            $type="overlay"
            class="app__window__content"
            halign="center"
            valign="center"
          >
            <Main />
          </box>
        </overlay>
      </window>
    );
  },
});
