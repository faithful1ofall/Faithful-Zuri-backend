// test/update.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = "https://faithful-zuri-backend.vercel.app"; // Import your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('UPDATE Operation', () => {
  it('should update a person\'s information', (done) => {
    // Replace this with the actual person's ID you want to update
    const personIdToUpdate = 1;

    chai
      .request(app)
      .put(`/api/${personIdToUpdate}`) // Specify the UPDATE route with the person's ID
      .send({ name: 'Updated Name' }) // Replace with the updated data you want to send
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Person updated successfully based on ID');
        done();
      });
  });

  // Add more specific test cases for the UPDATE operation as needed
});
