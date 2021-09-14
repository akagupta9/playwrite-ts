/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { ElementHandle, Page as PlayWrightPage, expect } from '@playwright/test';

export type WaitUntil = 'load' | 'domcontentloaded' | 'networkidle';

export type ElementOptions<T> = {
  replacementText?: Record<string, string>;
  parent?: keyof T;
  parentReplacementText?: Record<string, string>;
};

export type ClickOptions = {
  waitForNavigation?: boolean;
  waitUntil?: WaitUntil;
  clickCondition?: () => Promise<boolean>;
};

export class PageActions<T extends Record<string, string>> {
  constructor(protected page: PlayWrightPage, private selectors: T, private scope: ElementHandle) {}

  async navigateTo(url: string, options?: { waitUntil?: WaitUntil }) {
    return this.page.goto(url, { waitUntil: options.waitUntil });
  }

  async click(target: keyof T, elementOptions?: ElementOptions<T>, clickOptions?: ClickOptions): Promise<void> {
    const element = await this.get(target, elementOptions);
    if (clickOptions?.clickCondition === undefined || (await clickOptions?.clickCondition())) {
      await element.click();
      if (clickOptions.waitForNavigation) await this.waitForNavigation(clickOptions.waitUntil);
    }
  }

  async textContent(target: keyof T, elementOptions?: ElementOptions<T>): Promise<string> {
    const element = await this.get(target, elementOptions);
    return element.textContent();
  }

  async getAttribute(target: keyof T, attribute: string, elementOptions?: ElementOptions<T>): Promise<string> {
    const element = await this.get(target, elementOptions);
    return element.getAttribute(attribute);
  }

  async fill(target: keyof T, text: string, elementOptions?: ElementOptions<T>): Promise<void> {
    const element = await this.get(target, elementOptions);
    await element.fill(text);
  }

  async present(target: keyof T, elementOptions?: ElementOptions<T>): Promise<Boolean> {
    const element = await this.get(target, elementOptions);
    return element !== null;
  }

  async waitForSelector(target: keyof T, elementOptions?: ElementOptions<T>): Promise<ElementHandle> {
    const scope = await this.getScope(elementOptions);
    const selector = this.buildSelector(target, elementOptions?.replacementText);
    const element = await scope.waitForSelector(selector);
    expect(element).not.toBeNull();
    return element;
  }

  async waitUntilDetached(target: keyof T, elementOptions?: ElementOptions<T>): Promise<void> {
    const scope = await this.getScope(elementOptions);
    const selector = this.buildSelector(target, elementOptions?.replacementText);
    const element = await scope.waitForSelector(selector, { state: 'detached' });
    expect(element).toBeNull();
  }

  async waitForNavigation(waitUntil?: WaitUntil) {
    const until = waitUntil === undefined ? 'load' : waitUntil;
    await this.page.waitForNavigation({ waitUntil: until });
  }

  async get(target: keyof T, elementOptions?: ElementOptions<T>): Promise<ElementHandle> {
    const scope = await this.getScope(elementOptions);
    const selector = this.buildSelector(target, elementOptions?.replacementText);

    return scope.$(selector);
  }

  async getElements(target: keyof T, elementOptions?: ElementOptions<T>): Promise<ElementHandle[]> {
    const scope = await this.getScope(elementOptions);
    const selector = this.buildSelector(target, elementOptions?.replacementText);

    return scope.$$(selector);
  }

  async getElementCollectionText(target: keyof T, elementOptions?: ElementOptions<T>): Promise<string[]> {
    const elements = await this.getElements(target, elementOptions?.replacementText);

    const textValues = await Promise.all(
      elements.map(async (element) => {
        const textValue = await element.textContent();
        return textValue.trim();
      })
    );

    return textValues;
  }

  buildSelector(target: keyof T, replacementTexts?: Record<string, string>): string {
    let selector = this.selectors[target] as string;

    if (replacementTexts) {
      Object.keys(replacementTexts).forEach((key) => {
        selector = selector.replace(key, replacementTexts[key]);
      });
    }

    return selector;
  }

  private async getScope(elementOptions?: ElementOptions<T>): Promise<ElementHandle<Node> | PlayWrightPage> {
    return this.scope !== undefined
      ? elementOptions && elementOptions.parent
        ? this.scope.$(this.buildSelector(elementOptions.parent, elementOptions?.parentReplacementText))
        : this.scope
      : this.page;
  }
}
