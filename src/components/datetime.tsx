import GLib from "gi://GLib?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { registerStyle } from "../utils";

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
const weekdayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });

export function DateTime() {
  const timeLabel = { current: null as Gtk.Label | null };
  const dateLabel = { current: null as Gtk.Label | null };
  let timerId: number | null = null;

  const handleLabel = (label: typeof timeLabel) => {
    return (self: Gtk.Label) => {
      label.current = self;
    };
  };

  const handleSelf = (self) => {
    self.connect("map", () => {
      updateDateTime();
      timerId = GLib.timeout_add_seconds(
        GLib.PRIORITY_DEFAULT,
        60,
        updateDateTime,
      );
    });
    self.connect("unmap", () => {
      if (timerId === null) return;
      GLib.source_remove(timerId);
      timerId = null;
    });
  };

  const updateDateTime = () => {
    const now = new Date();
    timeLabel.current?.set_label(
      `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes(),
      ).padStart(2, "0")}`,
    );
    dateLabel.current?.set_label(
      `${weekdayFormatter.format(now)}, ${now.getDate()} of ${monthFormatter.format(
        now,
      )} ${now.getFullYear()}`,
    );
    return GLib.SOURCE_CONTINUE;
  };

  return (
    <box $={handleSelf} orientation={Gtk.Orientation.VERTICAL}>
      <label $={handleLabel(timeLabel)} class="datetime__time" xalign={0} />
      <label $={handleLabel(dateLabel)} class="datetime__date" />
    </box>
  );
}

registerStyle(
  "datetime",
  `
    .datetime__time {
      font-size: 5rem;
      font-weight: bold;
    }

    .datetime__date {
      font-size: 1.75rem;
    }
  `,
);
