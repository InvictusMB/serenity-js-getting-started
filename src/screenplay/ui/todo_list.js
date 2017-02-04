import {Target} from 'serenity-js/lib/screenplay-protractor';

import {by} from 'protractor';

export const What_Needs_To_Be_Done = Target.the('"What needs to be done?" input box').located(by.id('new-todo'));
export const Items = Target.the('List of Items').located(by.repeater('todo in todos'));
