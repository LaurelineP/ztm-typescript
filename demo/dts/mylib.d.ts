export function add(a: number, b: number, ...numbersArgs: number[]): number;

export function max(arr: number[]): number | null


export type ParamKind = 'uppercase' | 'lowercase'
export function setCase(message: string, kind: ParamKind): string | Error

export function quote(message: string): string