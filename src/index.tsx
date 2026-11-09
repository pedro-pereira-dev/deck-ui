import type app from "ags/gtk4/app";
import { Main } from "./views";

export function Router({ application }: { application: typeof app }) {
  return <Main application={application} />;
}
