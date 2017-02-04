var TodoList = require('../ui/todo_list').TodoList;
var Text = require('serenity-js/lib/screenplay-protractor').Text;

module.exports = {
    Displayed: Text.ofAll(TodoList.Items)
};
