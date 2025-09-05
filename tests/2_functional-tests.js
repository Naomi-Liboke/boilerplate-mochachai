/**
 * Functional Tests using Mocha, Chai, Chai-HTTP, and Zombie.js
 *
 * This file contains:
 *  - Integration tests for API routes using chai-http
 *  - Functional form submission tests using Zombie.js (headless browser)
 */

const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const Browser = require("zombie");

// Tell Zombie where the site is running
Browser.site = "http://0.0.0.0:3000";

// Create a new headless browser instance
const browser = new Browser();

suite("Functional Tests", function () {
  this.timeout(5000); // allow extra time for async operations

  /**
   * Integration tests with chai-http
   * These tests hit the API endpoints directly
   */
  suite("Integration tests with chai-http", function () {
    // #1 - Test GET /hello with no query params
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });

    // #2 - Test GET /hello with a query param
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=xy_z")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });

    // #3 - Test PUT /travellers with surname: "Colombo"
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Cristoforo");
          assert.equal(res.body.surname, "Colombo");
          done();
        });
    });

    // #4 - Test PUT /travellers with surname: "da Verrazzano"
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Giovanni");
          assert.equal(res.body.surname, "da Verrazzano");
          done();
        });
    });
  });

  /**
   * Functional tests with Zombie.js
   * These simulate a user filling in and submitting the HTML form
   */
  suite("Functional Tests with Zombie.js", function () {
    this.timeout(5000);

    // Quick sanity check for site property
    suite("Headless browser", function () {
      test('should have a working "site" property', function () {
        assert.isDefined(Browser.site);
      });
    });

    // Visit the home page before running the form tests
    suiteSetup(function (done) {
      browser.visit("/", done);
    });

    suite('"Famous Italian Explorers" form', function () {
      // #5 - Test form submission with surname: "Colombo"
      test('Submit the surname "Colombo" in the HTML form', function (done) {
        browser
          .fill("surname", "Colombo") // Fill input with Colombo
          .then(() => {
            browser.pressButton("submit", () => {
              browser.assert.success(); // Expect 200 OK
              browser.assert.text("span#name", "Cristoforo");
              browser.assert.text("span#surname", "Colombo");
              browser.assert.elements("span#dates", 1);
              done();
            });
          })
          .catch(done);
      });

      // #6 - Test form submission with surname: "Vespucci"
      test('Submit the surname "Vespucci" in the HTML form', function (done) {
        browser
          .fill("surname", "Vespucci") // Fill input with Vespucci
          .then(() => {
            browser.pressButton("submit", () => {
              browser.assert.success(); // Expect 200 OK
              browser.assert.text("span#name", "Amerigo");
              browser.assert.text("span#surname", "Vespucci");
              browser.assert.elements("span#dates", 1);
              done();
            });
          })
          .catch(done);
      });
    });
  });
});

/**
 * ======================
 * Mocha CLI Quick Guide
 * ======================
 *
 * Run the full test suite:
 *   npx mocha --ui tdd tests/2_functional-tests.js
 *
 * Run only a single test by name:
 *   npx mocha --ui tdd tests/2_functional-tests.js --grep "Colombo"
 *
 * Run only a suite by name:
 *   npx mocha --ui tdd tests/2_functional-tests.js --grep "Integration tests"
 */

