export class Profile {

  constructor({ id, name, surname, isBridgeInUser }) {
    this.id = id; // this is the user Id
    this.name = name;
    this.surname = surname;
    this.isBridgeInUser = isBridgeInUser;
  }

  toJson() {
    return {
      name: this.name,
      surname: this.surname,
      isBridgeInUser: this.isBridgeInUser,
    }
  }

  static fromFirebase(users) {
    const data = users.data()

    return new Profile({
      id: users.id,
      name: data.name,
      surname: data.surname,
      isBridgeInUser: data.isBridgeInUser,
    });
  }
}