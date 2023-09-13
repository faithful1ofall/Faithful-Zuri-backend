// test/delete.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = "https://faithful-zuri-backend.vercel.app"; // Import your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('DELETE Operation', () => {
  it('should delete a person', (done) => {
    // Replace this with the actual person's ID you want to delete
    const personIdToDelete = 1;

    chai
      .request(app)
      .delete(`/api/${personIdToDelete}`) // Specify the DELETE route with the person's ID
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Person deleted successfully based on ID');
        done();
      });
  });

  it('should delete a person based on name', (done) => {
    // Replace 'Mark Updated' with the actual name you want to delete
    chai
      .request(app)
      .delete('/api/Mark%20Updated') // Specify the DELETE route with the person's name
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('All matching persons deleted successfully based on name');
        done();
      });
  });
});
