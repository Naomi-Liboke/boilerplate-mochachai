# Mocha & Chai Testing Project

This project demonstrates **unit testing** and **functional testing** using [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Zombie.js](https://github.com/assaf/zombie).  
It includes two main test suites:  

- **Unit Tests (`1_unit-tests.js`)** – covers assertions, equality checks, comparisons, arrays, strings, and objects.  
- **Functional Tests (`2_functional-tests.js`)** – covers integration tests with `chai-http` and browser automation tests with `zombie.js`.  

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
npm install

---

Run the unit test suite (1_unit-tests.js) with:
npx mocha --ui tdd tests/1_unit-tests.js

Run the functional test suite (2_functional-tests.js) with:
npx mocha --ui tdd tests/2_functional-tests.js

---

🧪 Test Breakdown
1. Unit Tests (1_unit-tests.js)

Covers basic Chai assertions:

isNull, isDefined, isOk, isTrue

Equality: equal, strictEqual, deepEqual

Comparisons: isAbove, isAtLeast, isBelow, isAtMost

Arrays: isArray, include

Strings: isString, match

Objects: property, instanceOf

2. Functional Tests (2_functional-tests.js)

Covers:

Integration testing with chai-http:

GET requests (/hello)

PUT requests (/travellers)

Browser automation with zombie.js:

Visiting the homepage

Submitting form data (e.g., surnames "Colombo", "Vespucci")

Validating response text and DOM elements

---

🛠️ Tools & Libraries

Mocha – JavaScript test framework

Chai – Assertion library

chai-http – HTTP integration testing

Zombie.js – Headless browser for simulating user interaction