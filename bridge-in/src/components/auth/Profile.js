export class Profile {
  constructor(id, name, surname, level) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.level = level;
  }

  isValid() {
    return this.id && this.name && this.surname && this.level;
  }

  toJson() {
    return {
      name: this.name,
      surname: this.surname,
      level: this.level,
    };
  }

  static fromFirebase(doc) {
    const data = doc.data();

    return new Profile(doc.id, data.name, data.surname, data.level);
  }
}
