# JS229_Assessment_Project

- `todoManager`
  - Manages `todoList` objects
  - responsible for returning a set of `todo`s from a `todoList` based on certain criteria.
  - The todoManager interfaces with the `todoList` object. It has methods that query the `todoList` to return all or a subset of the todo objects as an array of todo objects.
  - The todoManager can query the `todoList` object in the following ways:
    - Return all `todo` objects
    - Return all completed `todo` objects
    - Return all `todo` objects within a given month-year combination
    - Return all completed `todo` objects within a given month-year combination

- `todoList`
  - collection of `todo` objects
  - Returns only a copy of the collection
  - Users cannot manipulate `todo` objects directly
  - Operations:
    - Maintains a collection of `todo` objects
    - Adds a `todo` object to the collection
    - Deletes a `todo` object from the collection
    - Initializes the collection with `todo` objects
    - Updates existing properties of a specific `todo` object
    - Returns a specified `todo` object based on its id property

- `todo` object
  - Constructor: `Todo`
  - *Only* have these properties:
    - Properties:
      - `id` (must be unique)
      - `title`
      - `completed`
      - `month`
      - `year`
      - `description`
    - Shared Methods:
      - `isWithinMonthYear(month, year)`

- [uuid](https://www.npmjs.com/package/uuid)
