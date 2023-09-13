// test/get.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = "https://faithful-zuri-backend.vercel.app"; // Import your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('READ/GET Operation', () => {
  it('should retrieve data using the GET All request', (done) => {
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
  
  it('should retrieve data using the GET request based on ID', (done) => {
    // Replace '1' with the actual person ID you want to fetch
    chai
      .request(app)
      .get('/api/4') // Specify the GET route with the person's ID
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        // Add assertions for the response data based on ID as needed
        done();
      });
  });

  it('should retrieve data using the GET request based on name', (done) => {
    // Replace 'Mark Essien' with the actual name you want to search for
    chai
      .request(app)
      .get('/api/Mark%20Essien') // Specify the GET route with the person's name
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        // Add assertions for the response data based on name as needed
        done();
      });
  });

});
