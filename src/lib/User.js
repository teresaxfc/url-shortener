class User {
  constructor(oauthProvider, externalId, firstName, lastName, email ) {
    this.oauthProvider = oauthProvider;
    this.externalId = externalId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

module.exports = User;
