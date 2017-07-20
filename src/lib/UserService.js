const UserRepository = require('./UserRepository');
const uuid = require('uuid-1345');
const Logger = require('./Logger');

const facebookUUID = uuid.v5({namespace: uuid.namespace.oid, name: 'facebook'});

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
    user._id = uuid.v5({namespace: facebookUUID, name: user.externalId});
    return this.userRepository.save(user)
  }

  findById(userId) {
    return this.userRepository.findById(userId);
  }
}

module.exports = UserService;
