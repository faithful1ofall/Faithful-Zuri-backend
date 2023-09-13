// test/get.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = "https://faithful-zuri-backend.vercel.app"; // Import your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET Operation', () => {
  it('should retrieve data using the GET request', (done) => {
    chai
      .request(app)
      .get('/api') // Specify the GET route you want to test
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        // Add assertions for the response data as needed
        done();
      });
  });

  // Add more specific test cases for the GET operation as needed
});
