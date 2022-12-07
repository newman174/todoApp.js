// testData.js
// note: must run after todoApp.js due to line 43

(function () {
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

  window.todoApp.todoSet = todoSet;
}());
