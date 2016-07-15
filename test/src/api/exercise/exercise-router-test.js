'use strict';

const assert = require('chai').assert;
const agentUtil = require('../util/agent-util');
const authUtil = require('../util/auth-util');


describe('exercise api test', () => {

  let agent;


  before(
    done => {
      agent = agentUtil.create();
      authUtil.createAuthenticatedTestUser(agent,'bobafett@bountyhunters.com')
        .then(() => done());
    }
  );

  it('should create an exercise', (done) => {
    const exercise = {
      name: 'Clean & Jerk',
      description: 'Full body exercise with complex techniques',
      links: null
    };
    return agent.post('/exercises')
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

  it('should not create an exercise without name', (done) => {
    const exercise = {
      description: 'Full body exercise with complex techniques'
    };
    return agent.post('/exercises')
      .send(exercise)
      .expect(500)
      .then(
        () => done()
      )
      .catch(
        err => done(err)
      );
  });

  it('should create an exercise with links', (done) => {
    const exercise = {
      name: 'Snatch',
      description: 'Full body exercise with complex techniques',
      links: [
        {
          url: 'http://youtube.com/test12345'
        },
        {
          description: 'Nice catch going fast under the bar',
          url: 'http://youtube.com/test12345'
        }
      ]
    };
    return agent.post('/exercises')
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

  it('should not create an exercise with a link that has no url', (done) => {
    const exercise = {
      name: 'Front Squat',
      links: [
        {
          description: 'Nice catch going fast under the bar'
        }
      ]
    };
    return agent.post('/exercises')
      .send(exercise)
      .expect(500)
      .then(
        () => done()
      )
      .catch(
        err => done(err)
      );
  });

  it('should get all exercises', (done) => {
    return agent.get('/exercises')
      .expect(200)
      .expect(
        response => {
          console.log(response.body);
        }
      )
      .then(
        () => done()
      )
      .catch(
        err => done(err)
      );
  });

  it('should get exercises by id', (done) => {
    const exercise = {
      name: 'Back Squat',
      description: 'Full body exercise',
      links: null
    };
    let id;
    return agent.post('/exercises')
      .send(exercise)
      .expect(201)
      .expect(
        response => {
          id = response.headers.location;
          assert.isNotNull(id);
        }
      )
      .then(
        () => {
          agent.get(`/exercises/${id}`)
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

  it('should update an exercise', (done) => {
    const style = {
      name: 'Double Under',
      description: 'Skipping twice for each jump'
    };
    let id;
    return agent.post('/exercises')
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
          style.description = 'Jump and pass the rope twice before landing';
          return agent.put(`/exercises/${id}`)
            .send(style)
            .expect(200)
            .then(
              () => agent.get(`/exercises/${id}`)
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
