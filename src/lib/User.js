class User {
  constructor( externalId, firstName, lastName, email ) {
    this.id = externalId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

module.exports = User;
