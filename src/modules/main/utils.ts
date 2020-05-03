export class Utils {

  public static getStringOrThrowError(value: string | null, errorMessage: string): string {
    if (value == null) {
      throw new Error(errorMessage);
    }

    return value;
  }

  public static notNullHTMLElementOrThrowError(value: HTMLElement | null, errorMessage: string): HTMLElement {
    if (value == null) {
      throw new Error(errorMessage);
    }

    return value;
  }
}
