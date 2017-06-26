const chai = require('chai');
const CounterRepository = require('../src/lib/CounterRepository');

const counterRepository = new CounterRepository();

const expect = chai.expect;

describe('CounterRepository test', () => {
  it('Should increase Id each time call the nextId function', () => {
    return counterRepository.nextId()
      .then(firstId => counterRepository.nextId()
        .then(secondId => expect(secondId).equals(firstId + 1))
      );
  });
});
