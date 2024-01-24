const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const { expect } = chai;
chai.use(chaiHttp);

describe('Items Controller', () => {
  it('should get all items', async () => {
	const res = await chai.request(app).get('/api/items/get');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  let id = 0;
  it('should add a new item', async () => {
    const item = {
      title: 'test',
      price: 499.99,
	  desc: 'Test description',
	  img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg'
	};
	const res = await chai.request(app).post('/api/items/create').send(item);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('title', item.title);
    id = res.body._id;
  });

  it('should delete new item', async () => {
    const res = await chai.request(app).delete(`/api/items/delete/${id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('_id', id);
  });

});

