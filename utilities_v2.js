(function () {
  const _ = function (argObj) {
    let u = {
      first() {
        return argObj.at(0);
      },

      last() {
        return argObj.at(-1);
      },

      without(...rejects) {
        return argObj.filter((elem) => !rejects.includes(elem));
      },

      lastIndexOf(target) {
        return argObj.findLastIndex((elem) => elem === target);
      },

      getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
      },

      sample(qty) {
        let copy = [...argObj];
        let result = [];
        if (qty === undefined) {
          qty = 1;
        }
        if (argObj.length === 1) return argObj[0];

        while (result.length < qty) {
          const index = this.getRandomInt(0, copy.length - 1);
          const elem = copy.splice(index, 1);
          if (!(result.includes(elem))) {
            result.push(elem);
          }
        }
        return result;
      },

      findWhere(propObj) {
        return argObj.find((elem, _idx) => {
          return Object.keys(propObj).every((key) => {
            return elem[key] === propObj[key];
          });
        });
      },

      where(propObj) {
        return argObj.filter((elem, _idx) => {
          return Object.keys(propObj).every((key) => {
            return elem[key] === propObj[key];
          });
        });
      },

      pluck(key) {
        let arr = [...argObj].filter((elem) => {
          return elem.hasOwnProperty(key);
        });

        return arr.map((elem) => elem[key]);
      },

      keys() {
        return Object.keys(argObj);
      },

      values() {
        return Object.values(argObj);
      },

      pick(...keys) {
        const result = {};

        keys.forEach((key) => {
          if (argObj.hasOwnProperty(key)) {
            result[key] = argObj[key];
          }
        });

        return result;
      },

      omit(...omitKeys) {
        const result = {};

        Object.keys(argObj).forEach((key) => {
          if (!(omitKeys.includes(key))) {
            result[key] = argObj[key];
          }
        });

        return result;
      },

      has(targetKey) {
        for (const key in argObj) {
          if (key === targetKey) return true;
        }
        return false;
      },
    };

    (['isElement', 'isArray', 'isObject', 'isFunction', 'isBoolean', 'isString', 'isNumber']).forEach((method) => {
      u[method] = function () { _[method].call(u, element) };
    });

    return u;
  }

  _.range = function (...args) {
    let startVal = 0;
    let endVal = args.at(-1);
    if (args.length > 1) {
      startVal = args.at(0);
    }
    let result = [];
    for (let index = startVal; index < endVal; index++) {
      result.push(index);
    }
    return result;
  };

  _.extend = function extendObj(...inputObjects) {
    if (inputObjects.length === 1) return inputObjects[0];

    return Object.assign(inputObjects[0], extendObj(...inputObjects.slice(1)));
  };

  _.isElement = function (node) {
    return node.nodeType === 1;
  };

  _.isArray = function (obj) {
    return Array.isArray(obj);
  };

  _.isObject = function (obj) {
    console.log(`typeof obj = ${typeof obj}`);
    return (typeof obj === 'object') || (typeof obj === 'function');
  };

  _.isFunction = function (obj) {
    return typeof obj === 'function';
  };

  _.isBoolean = function (val) {
    return (typeof val === 'boolean') || val.constructor === Boolean;
  };

  _.isString = function (val) {
    return (typeof val === 'string') || val.constructor === String;
  };

  _.isNumber = function (val) {
    return (typeof val === 'number') || val.constructor === Number;
  };

  window._ = _;
})();

// class _ {


//   first() {
//     return argObj.at(0);
//   };
//   last() {
//     return argObj.at(-1);
//   };
//   derange() { };
//   without(...rejects) {
//     console.log('hi world from without');
//     return argObj.filter((elem) => !rejects.includes(elem));
//   };
//   sample() {
//     console.log('hi world from sample');
//   };
//   lastIndexOf() {
//     console.log('hi world from lastIndexOf');
//   };
//   findWhere() { };
// }
