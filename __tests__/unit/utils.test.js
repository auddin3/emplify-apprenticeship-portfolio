const {
  handleSort,
  handleSearch,
  calculateDateDifference,
  camelCaseToSpaced,
  convertDateToString,
  capitalize,
  generateRandomString,
} = require('../../client/src/utils')

describe('Sorting Menu Functionality', () => {
  const defaultMenuOptions = [
    {
      type: 'alpha',
      name: 'Alphabetically (A-Z)',
      chronological: true,
    },
    {
      type: 'alpha',
      name: 'Alphabetically (Z-A)',
      chronological: false,
    },
  ]

  it('should correctly sort elements alphabetically in chronological order', () => {
    const elements = [
      { name: 'John', title: 'Engineer' },
      { name: 'Alice', title: 'Manager' },
      { name: 'Bob', title: 'Manager' },
      { name: 'Eve', title: 'Engineer' },
      { name: 'Timothy', title: 'Engineer' },
      { name: 'Garry', title: 'Engineer' },
    ];
    const selected = defaultMenuOptions[0]

    const sortedElements = handleSort({ elements, selected })

    expect(sortedElements).toEqual([
      { name: 'Alice', title: 'Manager' },
      { name: 'Bob', title: 'Manager' },
      { name: 'Eve', title: 'Engineer' },
      { name: 'Garry', title: 'Engineer' },
      { name: 'John', title: 'Engineer' },
      { name: 'Timothy', title: 'Engineer' },
    ])
  })

  it('should correctly sort elements alphabetically in reverse chronological order', () => {
    const elements = [
      { name: 'John', title: 'Engineer' },
      { name: 'Alice', title: 'Manager' },
      { name: 'Bob', title: 'Manager' },
      { name: 'Eve', title: 'Engineer' },
      { name: 'Timothy', title: 'Engineer' },
      { name: 'Garry', title: 'Engineer' },
    ];
    const selected = defaultMenuOptions[1]; // Alphabetically (Z-A)
  
    const sortedElements = handleSort({ elements, selected })

    expect(sortedElements).toEqual([
      { name: 'Timothy', title: 'Engineer' },
      { name: 'John', title: 'Engineer' },
      { name: 'Garry', title: 'Engineer' },
      { name: 'Eve', title: 'Engineer' },
      { name: 'Bob', title: 'Manager' },
      { name: 'Alice', title: 'Manager' },
    ]);
  })

  it('should correctly sort elements numerically in chronological order', () => {
    const elements = [
      { age: 30 },
      { age: 25 },
      { age: 12 },
      { age: 89 },
    ];
    const selected = { type: 'numerical', chronological: true, property: 'age',  name: 'Age', };

    const sortedElements = handleSort({ elements, selected });

    expect(sortedElements).toEqual([
      { age: 12 }, 
      { age: 25 }, 
      { age: 30 }, 
      { age: 89 }
    ]);
  })

  it('should correctly sort elements numerically in reverse chronological order', () => {
    const elements = [
      { age: 30 },
      { age: 25 },
      { age: 12 },
      { age: 89 },
    ];
    const selected = { type: 'numerical', chronological: false, property: 'age' };

    const sortedElements = handleSort({ elements, selected });

    expect(sortedElements).toEqual([ { age: 89 }, { age: 30 }, { age: 25 }, { age: 12 } ])
  })

  it('should correctly sort elements by date in chronological order', () => {
    const elements = [
      { date: '2022-01-01' },
      { date: '2023-01-01' },
    ];
    const selected = { type: 'date', chronological: true, property: 'date' };

    const sortedElements = handleSort({ elements, selected });

    expect(sortedElements).toEqual([
      { date: '2023-01-01' },
      { date: '2022-01-01' },
    ]);
  })

  it('should correctly sort elements by date in reverse chronological order', () => {
    const elements = [
      { date: '2022-01-01' },
      { date: '2023-01-01' },
    ];
    const selected = { type: 'date', chronological: false, property: 'date' };

    const sortedElements = handleSort({ elements, selected });

    expect(sortedElements).toEqual([
      { date: '2022-01-01' },
      { date: '2023-01-01' },
    ]);
  })
})

describe('handleSearch function', () => {
  const elements = [
    { title: 'Apple', module: 'Fruit' },
    { title: 'Banana', module: 'Fruit' },
    { title: 'Carrot', module: 'Vegetable' },
  ];

  const initialElements = [...elements];

  test('filters elements based on search term in title', () => {
    const searchTerm = 'app';
    const searchKeys = ['title'];

    const result = handleSearch({ searchTerm, elements, initialElements, searchKeys });

    expect(result).toEqual([{ title: 'Apple', module: 'Fruit' }]);
  });

  test('filters elements based on search term in module', () => {
    const searchTerm = 'veg';
    const searchKeys = ['module'];

    const result = handleSearch({ searchTerm, elements, initialElements, searchKeys });

    expect(result).toEqual([{ title: 'Carrot', module: 'Vegetable' }]);
  });

  test('returns all elements if search term is empty', () => {
    const searchTerm = '';
    const searchKeys = ['title'];

    const result = handleSearch({ searchTerm, elements, initialElements, searchKeys });

    expect(result).toEqual(elements);
  });

  test('returns no elements if search term does not match any', () => {
    const searchTerm = 'xyz';
    const searchKeys = ['title'];

    const result = handleSearch({ searchTerm, elements, initialElements, searchKeys });

    expect(result).toEqual([]);
  });
})

describe('calculateDateDifference', () => {
  test('calculates the difference between two dates correctly', () => {
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getTime() + (5 * 24 * 60 * 60 * 1000)); // 5 days from now
    expect(calculateDateDifference(targetDate)).toBe(5);
  });
});

describe('camelCaseToSpaced', () => {
  test('converts camelCase string to spaced string', () => {
    expect(camelCaseToSpaced('camelCaseString')).toBe('Camel Case String');
  });

  test('handles empty string', () => {
    expect(camelCaseToSpaced('')).toBe(undefined);
  });
});

describe('convertDateToString', () => {
  test('converts date to string with default options', () => {
    const date = new Date(2024, 3, 26); // April 26, 2024
    expect(convertDateToString(date)).toBe('26/04/2024');
  });

  test('converts date to string with custom options', () => {
    const date = new Date(2024, 3, 26); // April 26, 2024
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    expect(convertDateToString(date, options)).toBe('26 April 2024');
  });
});

describe('capitalize', () => {
  test('capitalizes the first letter of each word in a string', () => {
    expect(capitalize('hello world')).toBe('Hello World');
  });

  test('handles empty string', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('generateRandomString', () => {
  test('generates a random string of specified length', () => {
    expect(generateRandomString(10)).toHaveLength(10);
  });

  test('generates a random string with alphanumeric characters', () => {
    const randomString = generateRandomString(10);
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    expect(alphanumericRegex.test(randomString)).toBe(true);
  });
});

