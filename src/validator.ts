export class Validator {
  static require<T>(value?: T): T {
    if (value === null || value === undefined) {
      throw new Error();
    }
    return value;
  }
}
