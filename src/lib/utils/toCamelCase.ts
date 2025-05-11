export const toCamelCase = (str?: string): string =>
  str?.replace(/-([a-z0-9])/gi, (_, char) => char.toUpperCase()) ?? "";
