// todoApp.js

(function () {
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
    month: '2',
    year: '2017',
    description: 'Otherwise he gets hangry',
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

  // todoList Object
  const todoList = (function () {
    const items = [];

    const getOriginalById = function (id) {
      return items.find((item) => item.id === id); // maybe add error handling
    }

    return {
      add(...todoData) {
        todoData.forEach((datum) => {
          items.push(new Todo(datum));
        });
        return items.at(-1).id;
      },

      delete(...ids) {
        ids.forEach((id) => {
          const target = getOriginalById(id);
          const index = items.indexOf(target);
          items.splice(index, 1);
        });

        return ids.length;
      },

      filter(callback) {
        let itemsCopy = helpers.deepCopy(items)

        itemsCopy.forEach((item) => {
          item.isWithinMonthYear = Todo.prototype.isWithinMonthYear;
        });

        if (callback === undefined) return itemsCopy;

        return itemsCopy.filter(callback);
      },

      all() {
        return this.filter();
      },

      find(callback) {
        return this.filter().find(callback);
      },

      findById(id) {
        return this.find((item) => item.id === id);
      },

      update(id, newDataObj) {
        const item = getOriginalById(id);
        if (item === -1) return;   // maybe make more sophisticated with try catch throw

        ['title', 'month', 'year', 'description', 'completed'].forEach((key) => {
          if (newDataObj.hasOwnProperty(key)) item[key] = newDataObj[key];
        });

        return id;
      },

      markCompleted(...ids) {
        ids.forEach((id) => {
          // console.log('mark complete id: ' + id);
          todoList.update(id, {completed: true});
        });
        return ids;
      }
    }
  })();

  // todoManager Object
  const todoManager = (function () {
    return {
      filter(callback) {
        return todoList.filter(callback);
      },

      all() {
        return this.filter();
      },

      completed() {
        return this.filter((item) => item.completed);
      },

      itemsWithinMonthYear(month, year) {
        return this.filter((item) => item.isWithinMonthYear(month, year));
      },

      completedWithinMonthYear(month, year) {
        return this.filter((item) => item.completed && item.isWithinMonthYear(month, year));
      },
    }
  })();

  window.todoApp = {
    Todo,
    todoList,
    todoManager,
    todoSet,
  }


  // todoList.add(...todoSet);
  // const lastTodoId = todoList.add(...todoSet);
  // console.log(`lastTodoId = ${lastTodoId}`);

  // console.table(todoList.getItems());
  // console.table(todoManager.items());

  // console.log(todoList.getItems() !== todoList.getItems());

  // console.table(todoList.getItems((item) => item.year === '2017'));
  // console.table(todoList.getItems((item) => item.month === '1'));
  // console.log('deleted todo \n |\n\\ /')
  // console.table(todoList.delete(lastTodoId));
  // console.table(todoList.getItems());

  // const someItem = todoList.getItems((item) => item.year === '2017')[0];
  // // console.table(someItem);
  // console.table(todoList.update(someItem, {year: '2018', completed: true}));
  // // console.table(someItem);
  // console.table(todoManager.completed());
  // console.log(todoManager.completed()[0].completed)


  // const someItem = todoList.getItem(todoManager.items((item) => item.year === '2017')[0].id);
  // todoList.update(someItem, {year: '2018', completed: true});
  // console.table(todoManager.completed());
  // console.table(todoManager.items((item) => item.title === 'Buy chocolate'))

  // const someItem = todoList.getItem(todoManager.items((item) => item.title === 'Buy cat food')[0].id);
  // console.table(someItem);
  // console.table(todoManager.itemsWithinMonthYear(1, 2017))
  // todoList.update(someItem, {completed: true});
  // console.table(todoManager.completedWithinMonthYear(1, 2017));
})();
