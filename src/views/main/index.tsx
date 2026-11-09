import type app from "ags/gtk4/app";

export function Main({ application }: { application: typeof app }) {
  return (
    <window application={application} title="Hello, world!" visible>
      <label label="Hello, world!" />
    </window>
  );
}
