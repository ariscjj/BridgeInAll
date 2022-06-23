import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { storage } from '../firebase/firebase';

class FileService {

  uploadImage(file, onUploadProgress) {
    return new Promise((resolve, reject) => {

      const fileRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          // handle update
          this.handleProgressUpdate(snapshot, onUploadProgress);
        },
        (error) => {
          // handle error
          reject(error.message);
        },
        () => {
          // get downloadUrl for complete upload
          // resolve our promise
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            // resolve the download url
            resolve(downloadUrl);
          });
        },
      );

    });
  }

  handleProgressUpdate(snapshot, onUploadProgress) {
    if (onUploadProgress) {
      const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      onUploadProgress(progress);
    }
  }
}


const service = new FileService();
export default service;
