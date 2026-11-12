#!/bin/sh
set -eu

project_dir=/tmp/deck-ui
cd "$project_dir"
BACKGROUND_IMAGE=${BACKGROUND_IMAGE:-"$project_dir/assets/generated-pixel-art.jpg"}
export BACKGROUND_IMAGE

exec nix --extra-experimental-features 'nix-command flakes' develop .#default --command \
  watchexec \
  --watch "$project_dir" \
  --restart -- sh -c 'ags quit --instance deck-ui >/dev/null 2>&1 || true; exec ags-with-font ./app.tsx'
