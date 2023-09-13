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
      .send({ name: `Mark Essien` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Person added successfully');
        done();
      });
    });

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
