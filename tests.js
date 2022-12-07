/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */

// tests.js

// === Setup ==================================================================
const $ol = document.querySelector('ol');

const {
  Todo,
  todoList,
  todoManager,
  todoSet,
} = window.todoApp;
const todoData1 = todoSet[0];
const todoData2 = todoSet[1];

// === Helper Functions =======================================================
const outputResult = function (message) {
  const $li = document.createElement('li');
  $li.innerText = message;
  $ol.appendChild($li);
  return $li;
};

const test = function (message, assertion) {
  const $msg = outputResult(message);
  let passed = false;

  try {
    passed = assertion();
  // eslint-disable-next-line id-length
  } catch (e) {
    passed = false;
    console.error(e);
  }
  $msg.setAttribute('class', passed ? 'pass' : 'fail');
};

const heading = function (text) {
  const $h2 = document.createElement('h2');
  $h2.innerText = text;
  $ol.appendChild($h2);
  return $h2;
};

const assertSimilar = function (obj1, obj2) {
  const comparable = function (obj) {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      obj = Object.entries(obj);
    }
    return JSON.stringify(obj.sort());
  };

  return comparable(obj1) === comparable(obj2);
};

// === Helper Tests ===========================================================
heading('Helper Tests');

test('test formats properly on pass', () => true);

test('test formats properly on fail (*should display as red/fail*)', () => false);

test('assertSimilar works on arrays', () => {
  return (assertSimilar(['a', 'b'], ['b', 'a']) === true)
         && (assertSimilar(['a', 'c'], ['b', 'a']) === false);
});

test('assertSimilar works on non-array objects', () => {
  return (assertSimilar({ foo: 'bar', baz: 'qux' }, { baz: 'qux', foo: 'bar' }) === true)
         && (assertSimilar({ foo: 'bar', baz: 'qux' }, { baz: 'meow', foo: 'bar' }) === false);
});

// === Todo Tests =============================================================
heading('Todo Tests');

test('Todo constructor is defined', () => {
  return typeof Todo === 'function';
});

test("todo objects have unique id's", () => {
  const myTodo1 = new Todo(todoData1);
  const myTodo2 = new Todo(todoData2);

  return myTodo1.id && myTodo2.id && (myTodo1.id !== myTodo2.id);
});

test('A todo object only has the desired properties', () => {
  const myTodo = new Todo(todoData1);
  const expected = ['id', 'title', 'completed', 'month', 'year', 'description'].sort();
  const actual = Object.keys(myTodo).sort();

  return assertSimilar(expected, actual);
});

test('todo objects can delegate to a shared isWithinMonthYear method', () => {
  const myTodo1 = new Todo(todoData1);
  const myTodo2 = new Todo(todoData2);
  return (typeof myTodo1.isWithinMonthYear === 'function')
         && (myTodo1 !== myTodo2)
         && (myTodo1.isWithinMonthYear === myTodo2.isWithinMonthYear);
});

test('Todo.prototype.isWithinMonthYear method functions as expected', () => {
  const myTodoData = {
    title: 'Buy cat food',
    month: '2',
    year: '2017',
    description: 'Otherwise he gets hangry',
  };

  const myTodo = new Todo(myTodoData);

  return myTodo.isWithinMonthYear('2', '2017') === true
         && myTodo.isWithinMonthYear('3', '2018') === false
         && myTodo.isWithinMonthYear('2', '2018') === false;
});

// === todoList Tests =========================================================
heading('todoList Tests');

test('todoList object is defined', () => {
  return typeof todoList === 'object';
});

test('todoList maintains a collection of todo objects', () => {
  return Array.isArray(todoList.filter());
});

test('todoList can add a todo to the collection', () => {
  const newTodoId = todoList.add(todoData1);
  const items = todoList.all();

  const result = (items.length === 1)
                 && (items[0].id === newTodoId)
                 && (items[0].description === todoData1.description);

  todoList.delete(newTodoId);

  return result;
});

test('todoList can delete a todo from the collection', () => {
  const newTodoId = todoList.add(todoData1);
  todoList.delete(newTodoId);

  const items = todoList.all;

  return (items.length === 0);
});

test('todoList updates the existing properties of a specific todo object', () => {
  const targetId = todoList.add(todoData1);
  const newData = { title: 'New Title' };
  todoList.update(targetId, newData);

  const result = (todoList.all()[0].title === newData.title)
                 && (todoList.all()[0].description === todoData1.description);

  todoList.delete(targetId);
  return result;
});

test('todoList returns a specified todo based on its id', () => {
  const targetId = todoList.add(todoData1);
  const otherId = todoList.add(todoData2);

  const searchResult = todoList.findById(targetId);

  const testResult = searchResult.description === todoData1.description;
  todoList.delete(targetId);
  todoList.delete(otherId);

  return testResult;
});

// === todoManager Tests ======================================================
heading('todoManager Tests');

test('todoManager object is defined', () => {
  return typeof todoManager === 'object';
});

test('todoManager returns an array', () => {
  return typeof todoManager === 'object';
});

test('todoManager returned array is a copy of the collection', () => {
  // eslint-disable-next-line no-self-compare
  return (todoManager.all() !== todoManager.all());
});

test('todoManager returned array is a deep copy of the collection', () => {
  const targetId = todoList.add(todoData1);
  const snap = todoManager.all();
  snap[0].title = 'New Title';

  const testResult = (todoList.findById(targetId).title === todoData1.title)
                     && (todoList.findById(targetId).title !== snap[0].title);

  todoList.delete(targetId);

  return testResult;
});

test('todoManager can return all todo objects', () => {
  const newIds = todoSet.map((todoData) => {
    return todoList.add(todoData);
  });

  const testResult = (todoManager.all().length === todoSet.length);

  todoList.delete(...newIds);

  return testResult;
});

test('todoManager can return all completed todo objects', () => {
  const newIds = todoSet.map((todoData) => {
    return todoList.add(todoData);
  });

  todoList.markCompleted(newIds[0], newIds[1]);

  const testResult = (todoManager.all().length === todoSet.length)
                     && (todoManager.completed().length === 2)
                     && (todoManager.completed()[0].id === newIds[0]);

  todoList.delete(...newIds);

  return testResult;
});

test('todoManager can return all todo objects within a given month-year combination', () => {
  const myTodoData = {
    title: 'Buy cat food',
    month: '2',
    year: '2017',
    description: 'Otherwise he gets hangry',
  };

  const targetId = todoList.add(myTodoData);
  const otherId = todoList.add(todoData1);

  const testResult = (todoManager.itemsWithinMonthYear('2', '2017').length === 1)
                     && (todoManager.itemsWithinMonthYear('2', '2017')[0].id === targetId);

  todoList.delete(targetId, otherId);

  return testResult;
});

test('todoManager can return all completed todo objects within a given month-year combination', () => {
  const myTodoData = {
    title: 'Buy cat food',
    month: '2',
    year: '2017',
    description: 'Otherwise he gets hangry',
  };

  const targetId = todoList.add(myTodoData);
  const otherId = todoList.add(todoData1);

  todoList.markCompleted(targetId, otherId);

  const testResult = (todoManager.itemsWithinMonthYear('2', '2017').length === 1)
                     && (todoManager.itemsWithinMonthYear('2', '2017')[0].id === targetId);

  todoList.delete(targetId, otherId);

  return testResult;
});

test('no leftover testing items in the list', () => {
  return todoList.all().length === 0;
});
