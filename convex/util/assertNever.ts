// From https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-exhaustiveness-checking
// thực hiện kiểm tra tính toàn diện
export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${JSON.stringify(x)}`);
}
