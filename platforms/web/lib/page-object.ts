/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { ElementHandle, Page as PlayWrightPage } from "@playwright/test";
import { PageActions } from "./page-actions";

export class PageObject<T extends Record<string, string>> extends PageActions<T> {
  constructor(page: PlayWrightPage, selectors: T, scope: ElementHandle) {
    super(page, selectors, scope);
  }

  createPageInstance<K>(Type: any): K {
    return Type(this.page);
  }
}
