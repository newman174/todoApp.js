// todoApp.js

(function () {
  // Helper Function: Simple/insecure UUID generator (courtesy of StackOverflow)
  const generateUUID = function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => /* eslint-disable-line */
    /* eslint-disable-next-line */
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    ); /* eslint-disable-line */
  };

  const helpers = {
    // Helper Function: generateUUID
    generateUUID,

    // Helper Function: deepCopy
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  };

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
      return (Number(this.month) === Number(month))
             && (Number(this.year) === Number(year));
    }
  }

  // todoList Object
  const todoList = (function () {
    const items = [];

    const getOriginalById = function (id) {
      return items.find((item) => item.id === id); // maybe add error handling
    };

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
        const itemsCopy = helpers.deepCopy(items);

        itemsCopy.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
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
        if (item === -1) return; // maybe make more sophisticated with try catch throw

        ['title', 'month', 'year', 'description', 'completed'].forEach((key) => {
          if (newDataObj.hasOwnProperty(key)) item[key] = newDataObj[key];
        });
      },

      markCompleted(...ids) {
        ids.forEach((id) => {
          // console.log('mark complete id: ' + id);
          todoList.update(id, { completed: true });
        });
        return ids;
      },
    };
  }());

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
        return this.filter((item) => {
          return item.completed && item.isWithinMonthYear(month, year);
        });
      },
    };
  }());

  window.todoApp = {
    Todo,
    todoList,
    todoManager,
    todoSet,
  };
}());
