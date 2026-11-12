import app from "ags/gtk4/app";
import { Astal } from "ags/gtk4";
import { Main, Styles } from "./src";

app.start({
  css: `
    ${Styles}

    window {
      background-color: black;
    }
  `,
  instanceName: "deck-ui",
  main() {
    return (
      <window
        $={(self) => {
          self.connect("map", () => {
            self.present();
          });
        }}
        anchor={
          Astal.WindowAnchor.TOP |
          Astal.WindowAnchor.BOTTOM |
          Astal.WindowAnchor.LEFT |
          Astal.WindowAnchor.RIGHT
        }
        application={app}
        keymode={Astal.Keymode.ON_DEMAND}
        title="Hello, world!"
        visible
      >
        <box hexpand vexpand>
          <Main />
        </box>
      </window>
    );
  },
});
