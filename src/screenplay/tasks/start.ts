import { PerformsTasks, Task } from 'serenity-js/lib/screenplay';
import { Open, step } from 'serenity-js/lib/screenplay-protractor';     // imports the @step

var AddATodoItem  = require('./add_a_todo_item.js');

export class Start implements Task {

    static withATodoListContaining(items: string[]) {
        return new Start(items);
    }

    @step('{0} starts with a Todo List containing #items')      // Gives the Task a more descriptive name
    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            Open.browserOn('/examples/angularjs/'),
            ...this.addAll(this.items)                          // ``...` is a spread operator,
        );                                                      // which converts a list to vararg
    }

    constructor(private items: string[]) {
    }

    private addAll(items: string[]): Task[] {                   // transforms a list of item names
        return items.map(item => AddATodoItem.called(item));    // into a list of Tasks
    }
}
