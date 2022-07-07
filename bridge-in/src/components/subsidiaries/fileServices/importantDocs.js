export class ImportantDocs {
    constructor({ id, name, downloadUrl, subsidiaryId }) {
      this.id = id;
      this.name = name;
      this.downloadUrl = downloadUrl;
      this.subsidiaryId = subsidiaryId;
    }
  
    toJson() {
      return {
        name: this.name,
        downloadUrl: this.downloadUrl,
        subsidiaryId: this.subsidiaryId,
      }
    }
  
    static fromFirebase(doc) {
      const data = doc.data();
      return new ImportantDocs({
        id: doc.id,
        name: data.name,
        downloadUrl: data.downloadUrl,
        subsidiaryId: data.subsidiaryId,
      });
    }
  }