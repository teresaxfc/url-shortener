const chai = require('chai');
const CounterRepository = require('../src/lib/CounterRepository');

const expect = chai.expect;

describe('CounterRepository test', () => {
  const counterRepository = new CounterRepository();

  it('Should increase Id each time call the nextId function', () => {
    const generateFirstId = counterRepository.nextId();

    return generateFirstId
      .then(firstId => counterRepository.nextId()
        .then(secondId => expect(secondId).equals(firstId + 1))
      );
  });
});
