import {Utils} from "./utils/utils.js";

export class SelectEditor {

  private selectElement: HTMLSelectElement;
  private documentEditor: DocumentEditor;

  public constructor(document: Document, selectElementId: string) {
    this.documentEditor = DocumentEditor.fromDocument(document);
    this.selectElement = <HTMLSelectElement>this.documentEditor.getElement(selectElementId);
  }

  public addOptions(options: string[], optionElementClass: string) {
    options
      .forEach(option =>
          this.createOptionElementAndAddToSelect(option, optionElementClass));
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

export class HTMLElementEditor {

  private htmlElement: HTMLElement;
  private documentEditor: DocumentEditor;

  public constructor(document: Document, labelElementId: string) {
    this.documentEditor = DocumentEditor.fromDocument(document);
    this.htmlElement = this.documentEditor.getElement(labelElementId);
  }

  public setInnerHTML(innerHTML: string) {
    this.htmlElement.innerHTML = innerHTML;
  }

}

export class DocumentEditor {

  private readonly document: Document;

  private constructor(document: Document) {
    this.document = document;
  }

  public static fromDocument(document: Document): DocumentEditor {
    return new DocumentEditor(document);
  }


  public getElement(elementId: string): HTMLElement {
    const nullableResultElement: HTMLElement | null = this.document.getElementById(elementId);

    return Utils.notNullHTMLElementOrThrowError(nullableResultElement, "invalid element id");
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
