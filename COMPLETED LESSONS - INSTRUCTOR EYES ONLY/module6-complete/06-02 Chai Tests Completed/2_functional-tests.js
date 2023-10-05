const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({surname: "Colombo"}) // create the object and send that hoe
        .end(function (err, res) {
          assert.equal(res.status, 200, "We should get a response status of 200 ");//
          assert.equal(res.type, "application/json", "Response type should be a JSON")
          assert.equal(res.body.surname, "Colombo", "We should get the name we just mf sent")//
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
       chai
        .request(server)//
        .put("/travellers")//
        .send({surname: "da Verrazzano" })//
        .end( (err, res) => {//
          assert.equal(res.status, 200, "we want a good status of 200");//
          assert.equal(res.body.surname, "da Verrazzano", "We should get the name we just sent")//
          assert.equal(res.type, "application/json", "bc we want a json or whatever")
          done(); // never forget the done callback
        })
    });
  });
});

///What is failed to be mentioned here is we are going to simulate human interaction with a page - this is called a Headless Browser.
//A headless browser is a web browser without a interface - so there is nothing to see. we are just quality assurance testing the page,
//to ensure it response as it should, etc etc

const Browser = require('zombie'); // require zombie.js

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);
  const browser = new Browser()// create a new instance of a browser
  browser.site = "localhost:3000"// give the browser its site address
  setup((done) => { /// web interactions are async - so make sure to pass it a callback
    return browser.visit("/", done)
  })


  
  
  
  
  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });
  
  ///so in the html main view we see an input form. 
//it sends data to the "PUT /travellers" endpoint we just used/made above with an AJAX request.
// when the request completes successfully, the clint code appends a div containing the infos returned by the call - to the DOM

/// demonstrate on localhost:3000

//Did it? OK lets try to automate that process 
test("example - submit the input surname : Polo", (done) => {
  browser.fill("surname", "Polo")
  browser.pressButton("submit", () => {
    //press button is async... so we wait for the ajax call to complete... 

    //check the status code
    browser.assert.success()
    browser.assert.text("span#name", "Marco")
    browser.assert.text("span#surname", "Polo")
    browser.assert.element("span#dates", 1 )

    done()
  })
})



  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      //
      browser.fill("surname", "Colombo")
          browser.pressButton("submit", () => {
          browser.assert.success() //make sure status is 200
          browser.assert.text("span#surname", "Colombo", "The name should be mf colombo in the span id name")
          done()
        })
      // assert.fail();

      // done();
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill("surname", "Vespucci").then(() => {
        browser.pressButton("submit", () => {
          browser.assert.success()
          browser.assert.text("span#surname", "Vespucci", 'Vespucci should be the surname here bro')
          browser.assert.element("span#dates", 1)
          done()
        })
      })

      // done();
    });
  });
});
