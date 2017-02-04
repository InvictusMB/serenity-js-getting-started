import {extend, mapValues, partial} from 'lodash';

export function createSetters(setters) {
  return mapValues(setters, createSetter);
}

function createSetter(propertyName) {
  return function(value) {
    this[propertyName] = value;
    return this;
  };
}

export function createConstructorShortcuts(Constructor, setters) {
  return mapValues(setters, partial(createShortcut, Constructor));
}

function createShortcut(Constructor, propertyName, setterName) {
  return value => new Constructor()[setterName](value);
}
