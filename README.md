# Remote live development

On the Mac, run this from any directory in the project (requires Nix, `rsync`, and SSH access). It syncs immediately, then recursively syncs every change; leave it running:

```sh
sh scripts/sync-remote.sh
```

On NixOS, restart the old watcher once so it picks up this updated script, then run in a terminal in user `tv`'s graphical session:

```sh
sh /tmp/deck-ui/scripts/remote-dev.sh
```
