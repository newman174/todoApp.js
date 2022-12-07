// todoApp.js
// JS229 - Michael Newman - 12-06-2022

(function () {
  // Helper Function: Simple/insecure UUID generator - courtesy of StackOverflow
  const generateUUID = function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => /* eslint-disable-line */
    /* eslint-disable-next-line */
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    ); /* eslint-disable-line */
  };

  // ==========================================================================
  // === 0. helpers Object ====================================================
  // ==========================================================================

  const helpers = {
    // Helper Function: generateUUID
    generateUUID,

    // Helper Function: deepCopy
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  };

  // ==========================================================================
  // === 1. Todo constructor ==================================================
  // ==========================================================================

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

  // ==========================================================================
  // === 2. todoList Object ===================================================
  // ==========================================================================

  const todoList = (function () {
    const collection = [];

    const getOriginalById = function (id) {
      // maybe add error handling / input validation
      return collection.find((item) => item.id === id);
    };

    return {
      add(...inputData) {
        const newIds = inputData.map((datum) => {
          const todo = new Todo(datum);
          collection.push(todo);
          return todo.id;
        });
        return newIds.length > 1 ? newIds : newIds[0];
      },

      delete(...inputIds) {
        const deletedIds = inputIds.map((id) => {
          const target = getOriginalById(id);
          const index = collection.indexOf(target);
          collection.splice(index, 1);
          return id;
        });

        return deletedIds.length > 1 ? deletedIds : deletedIds[0];
      },

      update(id, newDataObj) {
        const item = getOriginalById(id);
        if (item === -1) return -1; // maybe make more sophisticated / throw error

        ['title', 'month', 'year', 'description', 'completed'].forEach((key) => {
          if (newDataObj.hasOwnProperty(key)) item[key] = newDataObj[key];
        });
        return id;
      },

      markCompleted(...ids) {
        ids.forEach((id) => {
          // console.log('mark complete id: ' + id);
          todoList.update(id, { completed: true });
        });
        return ids;
      },

      filter(callback) {
        const itemsCopy = helpers.deepCopy(collection);

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
  };
}());
