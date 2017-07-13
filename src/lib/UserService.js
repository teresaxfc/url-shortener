const UserRepository = require('./UserRepository');
const Logger = require('./Logger');

class UserService {
  constructor() {
    this.logger = new Logger();
    this.userRepository = new UserRepository();
  }

  getOrCreateByUserId(user) {
    return this.userRepository.findByExternalId( user.oauthProvider, user.externalId )
      .then(existingUser => existingUser || this.createNewUser(user));
  }

  createNewUser(user) {
    return this.userRepository.save(user)
  }

  findById(userId) {
    return this.userRepository.findById(userId);
  }
}

module.exports = UserService;
