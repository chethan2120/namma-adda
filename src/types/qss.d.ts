declare module "qss" {
  export function encode(value: Record<string, unknown>): string;
  export function decode(value: string): Record<string, string>;
}
