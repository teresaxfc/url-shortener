const chai = require('chai');
const UserService = require('../src/lib/UserService');
const User = require('../src/lib/User');
const expect = chai.expect;

describe('UserService test', () => {
  const userService = new UserService();

  it('Should create and return new user', () => {
    const user = new User('test',`test-create-${new Date().getTime()}`,'firstName','lastName','Email');

    return userService.getOrCreateByUserId(user)
      .then(createdUser => expect(createdUser).deep.equals(user));
  });

  it('Should return existing user', () => {
    const user = new User('test',`test-existing-${new Date().getTime()}`,'firstName','lastName','Email');

    return userService.getOrCreateByUserId(user)
      .then(createdUser => userService.getOrCreateByUserId(createdUser)
        .then(returnedUser => expect(returnedUser).deep.equals(createdUser))
      );
  });

  it('Should find user by id', () => {
    const user = new User('test',`test-find-${new Date().getTime()}`,'firstName','lastName','Email');

    return userService.createNewUser(user)
      .then(createdUser => userService.findById(createdUser._id)
        .then(returnedUser => expect(returnedUser).deep.equals(createdUser))
      );
  });
});
