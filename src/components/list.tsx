import Gtk from "gi://Gtk?version=4.0";
import { registerStyle } from "../utils";

export function List({ children }: { children: JSX.Element | JSX.Element[] }) {
  const onKeynavFailed = (self: Gtk.ListBox, direction: Gtk.DirectionType) => {
    const row =
      direction === Gtk.DirectionType.UP
        ? self.get_last_child()
        : direction === Gtk.DirectionType.DOWN
          ? self.get_first_child()
          : null;

    if (!row) return false;

    self.select_row(row as Gtk.ListBoxRow);
    row.grab_focus();
    return true;
  };

  return (
    <Gtk.ListBox
      class="boxed-list deck-list"
      focusable
      selectionMode={Gtk.SelectionMode.SINGLE}
      $={(self) => self.connect("keynav-failed", onKeynavFailed)}
    >
      {children}
    </Gtk.ListBox>
  );
}

registerStyle(
  "list",
  `
    list.deck-list {
      background-color: #1e1e2e;
      border: 1px solid #45475a;
      border-radius: 8px;
      color: #cdd6f4;
    }

    list.deck-list row label {
      padding: 10px 12px;
    }

    list.deck-list row:hover {
      background-color: #313244;
    }

    list.deck-list row:selected {
      background-color: #45475a;
      color: #ffffff;
    }
  `,
);
