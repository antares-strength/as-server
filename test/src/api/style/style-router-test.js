'use strict';

const assert = require('chai').assert;
const agentUtil = require('../util/agent-util');
const authUtil = require('../util/auth-util');


describe('style api test', () => {

  let agent;


  before(
    done => {
      agent = agentUtil.create();
      authUtil.createAuthenticatedTestUser(agent, 'jabba@thehuttcartel.com')
        .then(() => done());
    }
  );

  it('should create a style', (done) => {
    const exercise = {
      name: 'Warm up',
      description: 'Full body exercise with complex techniques'
    };
    return agent.post('/styles')
      .send(exercise)
      .expect(201)
      .expect(
        response => {
          assert.isNotNull(response.headers.location);
        }
      )
      .then(
        () => done()
      )
      .catch(
        err => done(err)
      );
  });

  it('should not create a style without name', (done) => {
    const exercise = {
      description: 'Makes you start sweating'
    };
    return agent.post('/styles')
      .send(exercise)
      .expect(500)
      .then(
        () => done()
      )
      .catch(
        err => done(err)
      );
  });

  it('should get all styles', (done) => {
    return agent.get('/styles')
      .expect(200)
      .expect(
        response => {
          console.log(response);
        }
      )
      .then(
        () => done()
      )
      .catch(
        err => done(err)
      );
  });

  it('should get a style by id', (done) => {
    const style = {
      name: 'SWOD',
      description: 'Strength workout',
      links: null
    };
    let id;
    return agent.post('/styles')
      .send(style)
      .expect(201)
      .expect(
        response => {
          id = response.headers.location;
          assert.isNotNull(id);
        }
      )
      .then(
        () => {
          agent.get(`/styles/${id}`)
            .expect(200)
            .then(
              () => done()
            );
        }
      )
      .catch(
        err => done(err)
      );
  });

  it('should update a style', (done) => {
    const style = {
      name: 'WOD',
      description: 'I do not describe what is a WOD'
    };
    let id;
    return agent.post('/styles')
      .send(style)
      .expect(201)
      .expect(
        response => {
          id = response.headers.location;
          assert.isNotNull(id);
        }
      )
      .then(
        () => {
          style.description = 'Work of the day';
          return agent.put(`/styles/${id}`)
            .send(style)
            .expect(200)
            .then(
              () => agent.get(`/styles/${id}`)
                .expect(200)
                .expect(
                  response => {
                    const dbStyle = response.body;
                    assert.equal(dbStyle.description, style.description);
                  }
                )
                .then(
                  () => done()
                )
            );
        }
      )
      .catch(
        err => done(err)
      );
  });

});
