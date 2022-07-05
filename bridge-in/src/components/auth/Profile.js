export class Profile {
  constructor(id, name, surname, role, approved) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.approved = approved;
  }

  isValid() {
    return this.id && this.name && this.surname && this.role && this.approved;
  }

  toJson() {
    return {
      name: this.name,
      surname: this.surname,
      role: this.role,
      approved: this.approved,
    };
  }

  static fromFirebase(doc) {
    const data = doc.data();

    return new Profile(
      doc.id,
      data.name,
      data.surname,
      data.role,
      data.approved
    );
  }
}

export class Role {
  static employee = "employee";
  static company = "company";
  static admin = "admin";
  static superAdmin = "superAdmin";
}
