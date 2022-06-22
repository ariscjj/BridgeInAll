export class Subsidiary {
  constructor(id, name, country, address, count, status) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.address = address;
    this.count = count;
    this.status = status;
    if (status === "incorporating") {
      this.color = "warning";
    } else if (status === "incorporated") {
      this.color = "primary";
    } else if (status === "winding down") {
      this.color = "danger";
    } else {
      this.color = "secondary";
    }
  }

  toJson() {
    return {
      name: this.name,
      country: this.country,
      address: this.address,
      count: this.count,
      status: this.status,
    };
  }

  static fromFirebase(doc) {
    const data = doc.data();
    return new Task(
      doc.id,
      data.name,
      data.country,
      data.address,
      data.count,
      data.status
    );
  }
}
