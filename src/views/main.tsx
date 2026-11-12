import type app from "ags/gtk4/app";
import { Astal } from "ags/gtk4";
import { List } from "../components";

export function Main({ application }: { application: typeof app }) {
  const list = (
    <List>
      <label label="First item" />
      <label label="Second item" />
      <label label="Third item" />
    </List>
  );

  return (
    <window
      $={(self) => {
        self.fullscreen();
        self.connect("map", () => {
          self.present();
          self.set_focus(list);
          list.grab_focus();
        });
      }}
      application={application}
      keymode={Astal.Keymode.ON_DEMAND}
      title="Hello, world!"
      visible
    >
      {list}
    </window>
  );
}
