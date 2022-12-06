// // import { v4 as uuidv4 } from 'uuid';
// // import { v4 as uuidv4 } from "https://github.com/uuidjs/uuid/blob/main/src/v4.js";
// // const { v4: uuidv4 } = require('uuid');

// function generateUUID() { // Public Domain/MIT
//   var d = new Date().getTime();//Timestamp
//   var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       var r = Math.random() * 16;//random number between 0 and 16
//       if(d > 0){//Use timestamp until depleted
//           r = (d + r)%16 | 0;
//           d = Math.floor(d/16);
//       } else {//Use microseconds since page-load if supported
//           r = (d2 + r)%16 | 0;
//           d2 = Math.floor(d2/16);
//       }
//       return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//   });
// }

// class TodoManager {
//   constructor(todoList) {
//     this.list = todoList;
//   }

//   filterList(callback) {
//     return this.list.items.filter(callback);
//   }

//   completed() {
//     return this.filterList((item) => item.completed);
//   }
// }

// class TodoList {
//   constructor() {
//     this.items = [];
//   }

//   add(todoData) {
//     this.items.push(new Todo(todoData));
//     return this;
//   }

//   getItem(itemId) {
//     return this.items.find((item) => item.id === itemId);
//   }


// }

// class Todo {
//   constructor(todoData) {
//     Object.assign(this, todoData);
//     this.completed = false;
//     this.id = generateUUID();
//   }
// }

// let todoData1 = {
//   title: 'Buy Milk',
//   month: '1',
//   year: '2017',
//   description: 'Milk for baby',
// };

// let todoData2 = {
//   title: 'Buy Apples',
//   month: '',
//   year: '2017',
//   description: 'An apple a day keeps the doctor away',
// };

// let todoData3 = {
//   title: 'Buy chocolate',
//   month: '1',
//   year: '',
//   description: 'For the cheat day',
// };

// let todoData4 = {
//   title: 'Buy Veggies',
//   month: '',
//   year: '',
//   description: 'For the daily fiber needs',
// };

// let todoSet = [todoData1, todoData2, todoData3, todoData4];

// let myList = new TodoList();

// todoSet.forEach((todoData) => {
//   myList.add(todoData);
// });

// console.table(myList.items);

// console.table(myList.getItem(myList.items[2].id));
// console.table(Object.getOwnPropertyDescriptors(myList.items[0]));
