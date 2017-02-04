var Serenity = require('serenity-js').Serenity;
var Actor = require('serenity-js/lib/screenplay-protractor').Actor;
var BrowseTheWeb = require('serenity-js/lib/screenplay-protractor').BrowseTheWeb;
var protractor = require('protractor');

var Start = require('../../src/screenplay/tasks/start').Start;
var AddATodoItem = require('../../src/screenplay/tasks/add_a_todo_item');
var listOf = require('../../src/text').listOf;
var TodoListItems =  require('../../src/screenplay/questions/todo_list_items.js');
var expect = require('../../src/expect').expect;

module.exports = function todoUserSteps() {

    var stage = Serenity.callToStageFor({
        actor: function(name) { return Actor.named(name).whoCan(BrowseTheWeb.using(protractor.browser)); }
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
