import { DateTime } from "../";
import { registerStyle } from "../utils";

export function Header() {
  return (
    <box>
      <DateTime />
      <box hexpand />
      <label class="header__settings" label="" />
    </box>
  );
}

registerStyle(
  "header",
  `
    .header__settings {
      width: 70rem;
      background-color: red;
      font-size: 2rem;
    }

    .header__settings label {
      font-size: 4rem;
      text-align: center;
    }


    .header__settings:focus,
    .header__settings:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }

    .header__settings:focus {
      outline: 2px solid white;
    }
  `,
);
