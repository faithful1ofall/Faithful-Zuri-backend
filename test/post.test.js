const chai = require('chai');
const chaiHttp = require('chai-http');
const app = "https://faithful-zuri-backend.vercel.app"; // Import your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('CRUD Operations', () => {
  it('should add a new person', (done) => {
    chai
      .request(app)
      .post('/api')
      .send({ "name" : "John Doe" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Person added successfully');
        done();
      });
    });
});
