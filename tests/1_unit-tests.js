/**
 * 1_unit-tests.js
 * ---------------
 * Unit tests for practicing Chai assertion methods with Mocha.
 *
 * Test Categories:
 * - Basic Assertions: null/undefined, truthy/falsey, booleans
 * - Equality: loose vs. strict equality, deep equality
 * - Comparisons: relational checks and approximate values
 * - Arrays: type checks and inclusion
 * - Strings: type checks, inclusion, regex matching
 * - Objects: properties, types, and instances
 *
 * Command to run these tests:
 *   npx mocha --ui tdd tests/1_unit-tests.js
 *
 * Notes:
 * - Mocha is the test runner (`--ui tdd` uses test/suite style).
 * - Chai provides the `assert` style assertions.
 */

const chai = require('chai');
const assert = chai.assert;

suite('Unit Tests', function () {
  /**
   * Basic Assertions
   * ----------------
   * Tests fundamental truthy/falsey values, null/undefined, and booleans.
   */
  suite('Basic Assertions', function () {
    // #1 Null vs. Not Null
    test('#isNull, #isNotNull', function () {
      assert.isNull(null, 'null should be null');
      assert.isNotNull(1, '1 is not null');
    });

    // #2 Defined vs. Undefined
    test('#isDefined, #isUndefined', function () {
      assert.isDefined('hello', 'Strings are defined');
      assert.isDefined(null, 'null is defined, though it is null');
      assert.isUndefined(undefined, 'undefined is undefined');
    });

    // #3 Truthy / Falsy values
    test('#isOk, #isNotOk', function () {
      assert.isNotOk(null, 'null is falsey');
      assert.isOk("I'm truthy", 'Non-empty strings are truthy');
      assert.isOk(true, 'true is truthy');
    });

    // #4 Boolean strict checks
    test('#isTrue, #isNotTrue', function () {
      assert.isTrue(true, 'true is true');
      assert.isTrue(!!'double negation', 'Double negation of truthy is true');
      assert.isNotTrue({ value: 'truthy' }, 'Objects are truthy but not strictly boolean true');
    });
  });

  // -----------------------------------------------------------------------------

  /**
   * Equality
   * --------
   * Tests coercive equality (==), strict equality (===), and deep equality.
   */
  suite('Equality', function () {
    // #5 Loose equality
    test('#equal, #notEqual', function () {
      assert.equal(12, '12', 'Numbers are coerced into strings with ==');
      assert.notEqual({ value: 1 }, { value: 1 }, 'Different object references are not equal');
      assert.equal(6 * '2', '12', 'Multiplication coerces string to number');
      assert.notEqual(6 + '2', '12', 'String concatenation gives "62" not "12"');
    });

    // #6 Strict equality
    test('#strictEqual, #notStrictEqual', function () {
      assert.notStrictEqual(6, '6', 'Number !== string');
      assert.strictEqual(6, 3 * 2, '6 === 6');
      assert.strictEqual(6 * '2', 12, 'String coerced to number matches 12');
      assert.notStrictEqual([1, 'a', {}], [1, 'a', {}], 'Different arrays are not strictly equal');
    });

    // #7 Deep equality
    test('#deepEqual, #notDeepEqual', function () {
      assert.deepEqual({ a: '1', b: 5 }, { b: 5, a: '1' }, 'Order of keys does not matter');
      assert.notDeepEqual({ a: [5, 6] }, { a: [6, 5] }, 'Order of array elements does matter');
    });
  });

  // -----------------------------------------------------------------------------

  /**
   * Comparisons
   * -----------
   * Demonstrates relational comparisons and approximate matching with deltas.
   */
  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }

  suite('Comparisons', function () {
    // #8 Greater than / at most
    test('#isAbove, #isAtMost', function () {
      assert.isAtMost('hello'.length, 5);
      assert.isAbove(1, 0);
      assert.isAbove(Math.PI, 3);
      assert.isAtMost(1 - Math.random(), 1);
    });

    // #9 Less than / at least
    test('#isBelow, #isAtLeast', function () {
      assert.isAtLeast('world'.length, 5);
      assert.isAtLeast(2 * Math.random(), 0);
      assert.isBelow(5 % 2, 2);
      assert.isBelow(2 / 3, 1);
    });

    // #10 Approximate values
    test('#approximately', function () {
      assert.approximately(weirdNumbers(0.5), 1, 0.5);
      assert.approximately(weirdNumbers(0.2), 1, 0.8);
    });
  });

  // -----------------------------------------------------------------------------

  /**
   * Arrays
   * ------
   * Tests array type checks and membership assertions.
   */
  const winterMonths = ['dec', 'jan', 'feb', 'mar'];
  const backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];

  suite('Arrays', function () {
    // #11 Array type checks
    test('#isArray, #isNotArray', function () {
      assert.isArray('isThisAnArray?'.split(''), 'split() returns an array');
      assert.isNotArray([1, 2, 3].indexOf(2), 'indexOf returns a number');
    });

    // #12 Array inclusion
    test('Array #include, #notInclude', function () {
      assert.notInclude(winterMonths, 'jul', 'July is not a winter month');
      assert.include(backendLanguages, 'javascript', 'JS is a backend language');
    });
  });

  // -----------------------------------------------------------------------------

  /**
   * Strings
   * -------
   * Tests string type checks, inclusion, and regex pattern matching.
   */
  const formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };

  suite('Strings', function () {
    // #13 String type checks
    test('#isString, #isNotString', function () {
      assert.isNotString(Math.sin(Math.PI / 4), 'Math.sin returns a number');
      assert.isString(process.env.PATH, 'Environment variables are strings');
      assert.isString(JSON.stringify({ type: 'object' }), 'JSON.stringify returns a string');
    });

    // #14 String inclusion
    test('String #include, #notInclude', function () {
      assert.include('Arrow', 'row', "'Arrow' contains 'row'");
      assert.notInclude('dart', 'queue', "'dart' does not contain 'queue'");
    });

    // #15 Regex match
    test('#match, #notMatch', function () {
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.match(formatPeople('John Doe', 35), regex, 'Valid formatted string');
      assert.notMatch(formatPeople('Paul Smith III', 'twenty-four'), regex, 'Invalid age format');
    });
  });

  // -----------------------------------------------------------------------------

  /**
   * Objects
   * -------
   * Tests object properties, types, and instances.
   */
  const Car = function () {
    this.model = 'sedan';
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  suite('Objects', function () {
    // #16 Object properties
    test('#property, #notProperty', function () {
      assert.notProperty(myCar, 'wings', 'Cars do not have wings');
      assert.property(airlinePlane, 'engines', 'Planes have engines');
      assert.property(myCar, 'wheels', 'Cars have wheels');
    });

    // #17 Type checks
    test('#typeOf, #notTypeOf', function () {
      assert.typeOf(myCar, 'object');
      assert.typeOf(myCar.model, 'string');
      assert.notTypeOf(airlinePlane.wings, 'string');
      assert.isArray(airlinePlane.engines, 'Engines is an array');
      assert.typeOf(myCar.wheels, 'number');
    });

    // #18 Instance checks
    test('#instanceOf, #notInstanceOf', function () {
      assert.notInstanceOf(myCar, Plane, 'Car is not a Plane');
      assert.instanceOf(airlinePlane, Plane, 'airlinePlane is a Plane');
      assert.instanceOf(airlinePlane, Object, 'All objects are instances of Object');
      assert.notInstanceOf(myCar.wheels, String, 'Number is not an instance of String');
    });
  });
});
