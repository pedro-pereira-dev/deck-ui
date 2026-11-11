#!/bin/sh
set -eu

project_dir=/tmp/deck-ui
cd "$project_dir"

exec nix --extra-experimental-features 'nix-command flakes' develop .#default --command \
  watchexec \
  --watch "$project_dir" \
  --restart -- sh -c 'ags quit --instance deck-ui >/dev/null 2>&1 || true; exec ags run ./app.tsx'
