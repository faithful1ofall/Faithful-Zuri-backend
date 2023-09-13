// test/update.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = "https://faithful-zuri-backend.vercel.app"; // Import your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('UPDATE/PUT/PATCH Operation based on ID', () => {
  it('should update a person\'s information', (done) => {
    // Replace this with the actual person's ID you want to update
    const personIdToUpdate = 1;

    chai
      .request(app)
      .put(`/api/${personIdToUpdate}`) // Specify the UPDATE route with the person's ID
      .send({ name: 'Mark' }) // Replace with the updated data you want to send
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Person updated successfully based on ID');
        done();
      });
  });

  it('should update a person\'s information based on name', (done) => {
    // Replace 'Mark Essien' with the actual name you want to update
    chai
      .request(app)
      .put('/api/Mark%20Essien') // Specify the UPDATE route with the person's name
      .send({ name: 'Mark Updated' }) // Replace with the updated data you want to send
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('All matching persons updated successfully based on name');
        done();
      });
  });
});
