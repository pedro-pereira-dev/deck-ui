import Gtk from "gi://Gtk?version=4.0";
import { Content, Footer, Header } from "../";

export function Main() {
  return (
    <box orientation={Gtk.Orientation.VERTICAL}>
      <Header />
      <Content />
      <Footer />
    </box>
  );
}
