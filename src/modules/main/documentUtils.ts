
export class SelectEditor {

  private selectElement: HTMLSelectElement;
  private documentEditor: DocumentEditor;

  public constructor(document: Document, selectElementId: string) {
    this.documentEditor = new DocumentEditor(document);
    this.selectElement = <HTMLSelectElement>this.documentEditor.getElement(selectElementId);
  }

  public addOptions(options: string[], optionElementClass: string) {
    options
      .forEach(option => this.createOptionElementAndAddToSelect(option, optionElementClass));
  }

  private createOptionElementAndAddToSelect(optionElementName: string, optionElementClass: string) {
    const optionElement = this.buildOptionElement(optionElementName, optionElementClass);

    this.selectElement.appendChild(optionElement);
  }

  private buildOptionElement(optionElementName: string, optionElementClass: string): HTMLOptionElement {
    const document: Document = this.documentEditor.getDocument();

    return OptionElementBuilder.Builder(document)
    .value(optionElementName)
    .innerHTML(optionElementName)
    .className(optionElementClass)
    .build();
  }

}

export class DocumentEditor {

  private readonly document: Document;

  public constructor(document: Document) {
    this.document = document;
  }

  public getElement(elementId: string): HTMLElement {
    const resultElement = this.document.getElementById(elementId);

    if (resultElement == null) {
      throw new Error("invalid element id");
    }

    return resultElement;
  }

  public getDocument(): Document {
    return this.document;
  }
}

export class OptionElementBuilder {

  private static OPTION_TAG: string = "option";

  private readonly resultOptionElement: HTMLOptionElement;

  private constructor(document: Document) {
    this.resultOptionElement = <HTMLOptionElement>document.createElement(OptionElementBuilder.OPTION_TAG);
  }

  public static Builder(document: Document) {
    return new OptionElementBuilder(document);
  }

  public value(value: string): OptionElementBuilder {
    this.resultOptionElement.value = value;

    return this;
  }

  public innerHTML(value: string): OptionElementBuilder {
    this.resultOptionElement.innerHTML = value;

    return this;
  }

  public className(value: string): OptionElementBuilder {
    this.resultOptionElement.className = value;

    return this;
  }

  public build(): HTMLOptionElement {
    return this.resultOptionElement;
  }

}
