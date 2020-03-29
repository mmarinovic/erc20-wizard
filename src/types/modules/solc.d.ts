declare module 'solc' {
  export function compile(
    source: string
  ): { contracts: Record<string, { interface: string; bytecode: string }> };
}
