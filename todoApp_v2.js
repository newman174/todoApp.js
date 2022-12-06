// todoApp_v2.js

'use strict';

const helpers = {

  // Helper Function: generateUUID
  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0) {//Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  },

  // Helper Function: deepCopy
  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}



// Sample input data
const todoData1 = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};
const todoData2 = {
  title: 'Buy Apples',
  month: '',
  year: '2017',
  description: 'An apple a day keeps the doctor away',
};
const todoData3 = {
  title: 'Buy chocolate',
  month: '1',
  year: '',
  description: 'For the cheat day',
};
const todoData4 = {
  title: 'Buy Veggies',
  month: '',
  year: '',
  description: 'For the daily fiber needs',
};
const todoSet = [todoData1, todoData2, todoData3, todoData4];

// Todo constructor
class Todo {
  constructor(todoData) {
    Object.assign(this, todoData);
    this.completed = false;
    this.id = helpers.generateUUID();
  }
}

// Shared method: isWithinMonthYear
Todo.prototype.isWithinMonthYear = function (month, year) { };

// todoList Object
const todoList = (function () {
  const items = [];

  const findById = function (id) {
    return items.find((item) => item.id === id);
  }

  return {
    add(...todoData) {
      todoData.forEach((datum) => {
        items.push(new Todo(datum));
      }, this);
      return items.at(-1).id;
    },

    delete(id) {
      const item = findById(id);
      const index = items.indexOf(item);
      return items.splice(index, 1);
    },

    getItem(id) {
      return helpers.deepCopy(findById(id));
    },

    getItems() {
      return helpers.deepCopy(items);
    },

    updateItem(item, newData) {
      Object.assign(item, newData);
    },
  }
})();

// todoManager Object
const todoManager = (function () {
  const list = [];

  return {
    init(todoList) {
      this.list = todoList;
      return this;
    },

    filterList(callback) {
      return this.list.items.filter(callback);
    },

    completed() {
      return this.filterList((item) => item.completed);
    },
  }
})();

const lastTodoId = todoList.add(...todoSet);
console.log(`lastTodoId = ${lastTodoId}`);

console.table(todoList.getItems());
console.log(todoList.getItems() !== todoList.getItems());
