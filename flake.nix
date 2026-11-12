{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    ags.url = "github:aylur/ags";
    ags.inputs.nixpkgs.follows = "nixpkgs";
  };
  outputs =
    {
      ags,
      nixpkgs,
      ...
    }:
    let
      fontFamily = "Maple Mono NF";
      forAllSystems = nixpkgs.lib.genAttrs systems;
      systems = [
        "aarch64-linux"
        "x86_64-linux"
      ];
    in
    {
      packages = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.stdenv.mkDerivation {
            name = "deck-ui";
            src = ./.;

            nativeBuildInputs = with pkgs; [
              ags.packages.${system}.default
              gobject-introspection
              wrapGAppsHook3
            ];

            buildInputs = [
              ags.packages.${system}.astal4
              pkgs.gjs
            ];

            installPhase = ''
              runHook preInstall
              mkdir -p $out/bin $out/share
              cp -r * $out/share
              ags bundle app.tsx "$out/bin/$name" -d "FONT_FAMILY='${fontFamily}'" -d "SRC='$out/share'"
              runHook postInstall
            '';
          };
        }
      );

      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          agsWithFont = pkgs.writeShellScriptBin "ags-with-font" ''
            exec ${ags.packages.${system}.default}/bin/ags run --define "FONT_FAMILY='${fontFamily}'" "$@"
          '';
        in
        {
          default = pkgs.mkShell {
            packages = [
              ags.packages.${system}.default
              agsWithFont
              pkgs.maple-mono.NF
              pkgs.watchexec
            ];
          };
        }
      );
    };
}
