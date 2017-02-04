import {browser} from 'protractor';
import {synchronise, scenarioLifeCycleNotifier} from 'serenity-js/lib/serenity-cucumber';

export default function() {
  this.registerListener(scenarioLifeCycleNotifier());
  synchronise(this, browser.driver.controlFlow());
};
