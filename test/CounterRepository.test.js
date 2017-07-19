const chai = require('chai');
const CounterRepository = require('../src/lib/CounterRepository');

const expect = chai.expect;

describe('CounterRepository test', () => {
  const counterRepository = new CounterRepository();

  it('Should return 1 when no existing counter', () => {
    counterRepository.counterId = `url_counter_test_${new Date()}`;

    return counterRepository.nextId()
      .then(id => expect(id).equals(1));
  });

  it('Should increase counter by 1 when the counter exists', () => {
    counterRepository.counterId = `url_counter_test_increase_${new Date()}`;

    return counterRepository.nextId()
      .then(firstId => counterRepository.nextId()
        .then(secondId => expect(secondId).equals(2))
      );
  });
});
