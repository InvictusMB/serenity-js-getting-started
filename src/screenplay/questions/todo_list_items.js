import * as TodoList from '../ui/todo_list';
import {Text} from 'serenity-js/lib/screenplay-protractor';

export const Displayed = Text.ofAll(TodoList.Items);
