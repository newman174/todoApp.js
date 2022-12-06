// todoApp_v2.js

// 'use strict';

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
const todoData5 = {
  title: 'Buy cat food',
  month: '1',
  year: '2017',
  description: 'For the daily fiber needs',
};
const todoSet = [todoData1, todoData2, todoData3, todoData4, todoData5];

// Todo constructor
class Todo {
  constructor(todoData) {
    Object.assign(this, todoData);
    this.completed = false;
    this.id = helpers.generateUUID();
  }

  isWithinMonthYear(month, year) {
    return (Number(this.month) === Number(month)) && (Number(this.year) === Number(year));
  }
}

// // Todo Shared Method: isWithinMonthYear
// Todo.prototype.isWithinMonthYear = function (month, year) {
//   return (Number(this.month) === Number(month)) && (Number(this.year) === Number(year));
// };

// todoList Object
const todoList = (function () {
  const items = [];

  return {
    add(...todoData) {
      todoData.forEach((datum) => {
        items.push(new Todo(datum));
      }, this);
      return items.at(-1).id;
    },

    delete(id) {
      const item = this.getItem(id);
      const index = items.indexOf(item);
      return items.splice(index, 1);
    },

    getItem(id) {
      return items.find((item) => item.id === id);
    },

    getItems(callback) {
      let itemsCopy = helpers.deepCopy(items)
      itemsCopy.forEach((item) => {
        item.isWithinMonthYear = Todo.prototype.isWithinMonthYear;
      })
      if (callback === undefined) return itemsCopy;

      return itemsCopy.filter(callback);
    },

    // getItems(callback) {
    //   return helpers.deepCopy(items)
    // },

    updateItem(item, newData) {
      Object.assign(item, newData);
      return item;
    },
  }
})();

// todoManager Object
const todoManager = (function () {
  return {
    // getItems: todoList.getItems.bind(todoList),

    items(filterCallback) {
      return todoList.getItems(filterCallback);
    },

    completed() {
      return todoList.getItems((item) => item.completed);
    },

    itemsWithinMonthYear(month, year) {
      return todoList.getItems((item) => item.isWithinMonthYear(month, year));
    },

    completedWithinMonthYear(month, year) {
      return todoList.getItems((item) => item.completed && item.isWithinMonthYear(month, year));
    },
  }
})();

// window.app = {
//   // Todo,
//   todoList,
//   todoManager,
// }

window.app = 'foo';

todoList.add(...todoSet);
// const lastTodoId = todoList.add(...todoSet);
// console.log(`lastTodoId = ${lastTodoId}`);

// console.table(todoList.getItems());
console.table(todoManager.items());

// console.log(todoList.getItems() !== todoList.getItems());

// console.table(todoList.getItems((item) => item.year === '2017'));
// console.table(todoList.getItems((item) => item.month === '1'));
// console.log('deleted todo \n |\n\\ /')
// console.table(todoList.delete(lastTodoId));
// console.table(todoList.getItems());

// const someItem = todoList.getItems((item) => item.year === '2017')[0];
// // console.table(someItem);
// console.table(todoList.updateItem(someItem, {year: '2018', completed: true}));
// // console.table(someItem);
// console.table(todoManager.completed());
// console.log(todoManager.completed()[0].completed)


// const someItem = todoList.getItem(todoManager.items((item) => item.year === '2017')[0].id);
// todoList.updateItem(someItem, {year: '2018', completed: true});
// console.table(todoManager.completed());
// console.table(todoManager.items((item) => item.title === 'Buy chocolate'))

const someItem = todoList.getItem(todoManager.items((item) => item.title === 'Buy cat food')[0].id);
console.table(someItem);
console.table(todoManager.itemsWithinMonthYear(1, 2017))
todoList.updateItem(someItem, {completed: true});
console.table(todoManager.completedWithinMonthYear(1, 2017))
