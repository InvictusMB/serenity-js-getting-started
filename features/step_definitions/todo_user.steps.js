import {Serenity} from 'serenity-js';
import {Actor, BrowseTheWeb} from 'serenity-js/lib/screenplay-protractor';

import {expect} from '../../src/expect';
import {browser} from 'protractor';

import {listOf} from '../../src/text';

import {Start} from '../../src/screenplay/tasks/start';
import {AddATodoItem} from '../../src/screenplay/tasks/add_a_todo_item';

import * as TodoListItems from '../../src/screenplay/questions/todo_list_items';

export default function todoUserSteps() {

  var stage = Serenity.callToStageFor({
    actor: function(name) { return Actor.named(name).whoCan(BrowseTheWeb.using(browser)); }
  });

  this.Given(/^.*that (.*) has a todo list containing (.*)$/, function(name, items) {
    return stage.theActorCalled(name).attemptsTo(
      Start.withATodoListContaining(listOf(items))
    );
  });

  this.When(/^s?he adds (.*?) to (?:his|her) list$/, function(itemName) {
    return stage.theActorInTheSpotlight().attemptsTo(
      AddATodoItem.called(itemName)
    )
  });

  this.Then(/^.* todo list should contain (.*?)$/, function(items) {
    return expect(stage.theActorInTheSpotlight().toSee(TodoListItems.Displayed))
      .eventually.deep.equal(listOf(items))
  });
};
