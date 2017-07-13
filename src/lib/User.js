class User {
  constructor(id, oauthProvider, externalId, firstName, lastName, email ) {
    this._id = id;
    this.oauthProvider = oauthProvider;
    this.externalId = externalId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

module.exports = User;
