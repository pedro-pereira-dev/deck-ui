import GLib from "gi://GLib?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { registerStyle } from "../utils";

export function List({ children }: { children: JSX.Element | JSX.Element[] }) {
  const rows = Array.isArray(children) ? children : [children];
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
      class="deck-list"
      focusable
      selectionMode={Gtk.SelectionMode.SINGLE}
      $={(self) => {
        self.connect("keynav-failed", onKeynavFailed);
        self.connect("map", () => {
          GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            const firstRow = self.get_row_at_index(0);
            if (!firstRow) return GLib.SOURCE_REMOVE;

            self.select_row(firstRow);
            self.grab_focus();
            firstRow.grab_focus();
            return GLib.SOURCE_REMOVE;
          });
        });
      }}
    >
      {rows.map((child) => (
        <Gtk.ListBoxRow class="deck-list__item" focusable>
          {child}
        </Gtk.ListBoxRow>
      ))}
    </Gtk.ListBox>
  );
}

registerStyle(
  "list",
  `
    .deck-list {
      background-color: #1e1e2e;
      border: 1px solid #45475a;
      border-radius: 8px;
      color: #cdd6f4;
    }

    .deck-list__item label {
      padding: 10px 12px;
    }

    .deck-list__item:hover {
      background-color: #313244;
    }

    .deck-list row:focus,
    .deck-list row:selected {
      background-color: #45475a;
      color: #ffffff;
    }
  `,
);
