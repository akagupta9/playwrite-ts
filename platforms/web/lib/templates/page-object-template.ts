/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { ElementHandle, Page as PlaywrightPage } from '@playwright/test';
import { scheduleCallBack, then } from './chainable-promise-proxy';
import { PageObject } from '../page-object';

export interface PageObjectTemplate<T extends Record<string, string>, K> {
  playwrightPage: PlaywrightPage;
  scope?: ElementHandle;
  selectors?: T;
  actions: (
    webPage: PageObject<T>,
    scheduleCallBack: (cb: () => Promise<any>) => Promise<any>,
    then: (callBack: (arg: Promise<any>) => any) => any
  ) => K;
}

export const WebPage = <T extends Record<string, string>, K>(po: PageObjectTemplate<T, K>): K => {
  return po.actions(new PageObject(po.playwrightPage, po.selectors, po.scope), scheduleCallBack, then);
};
