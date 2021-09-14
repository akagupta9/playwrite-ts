import { ElementHandle, Page as PlaywrightPage } from '@playwright/test';
import { PageActions } from '../page-actions';

export interface ComponentTemplate<T extends Record<string, string>, K> {
  playwrightPage: PlaywrightPage;
  scope?: ElementHandle;
  selectors?: T;
  // eslint-disable-next-line no-unused-vars
  actions: (page: PageActions<T>) => K;
}

export const Component = <T extends Record<string, string>, K>(component: ComponentTemplate<T, K>): K => {
  return component.actions(new PageActions(component.playwrightPage, component.selectors, component.scope));
};
