export class PDF {
  
    constructor(fileUrl) {
      this.fileUrl = fileUrl;
      this.file = null;
    }
  
    isValid(){
      return !!(this.file || this.fileUrl);
    }
  }