#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
remote=chuck@192.168.1.40
remote_dir=/tmp/deck-ui

sync() {
  printf 'Syncing project to %s:%s\n' "$remote" "$remote_dir"
  rsync -a --delete --delete-excluded \
    --exclude='.git/' \
    --exclude='.DS_Store' \
    --exclude='result' \
    "$project_dir/" "$remote:$remote_dir/"
  printf 'Sync complete\n'
}

ssh "$remote" "mkdir -p '$remote_dir'"
sync

nix --extra-experimental-features 'nix-command flakes' run nixpkgs#fswatch -- \
  --recursive \
  --one-per-batch \
  --exclude='/\.git/' \
  --exclude='/result$' \
  "$project_dir" |
  while IFS= read -r _; do
    sync
  done
