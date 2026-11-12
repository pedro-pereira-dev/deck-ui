const registeredStyles = new Map<string, string>();

export function registerStyle(name: string, style: string) {
  registeredStyles.set(name, style);
}

export function getStyles() {
  return [...registeredStyles.values()].join("\n");
}
