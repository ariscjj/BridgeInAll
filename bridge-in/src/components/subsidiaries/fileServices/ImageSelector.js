import React, { useRef, useState } from 'react';

export default function ImageSelector({
  title,
  onFileChange
}) {
  const inputRef = useRef(null);
  const [fileContent, setFileContent] = useState('');

  function onFileSelected(e) {
    let file = null;

    if (e.target.files.length) {
      file = e.target.files[0];

      const fileReader = new FileReader();

      fileReader.onload = (res) => {
        // get result of file read
        setFileContent(res.target.result);
      };
      fileReader.readAsDataURL(file);
    }

    onFileChange(file);
  }

  return (
      <div>
    <div className="mb-3 d-flex mx-3">
      <label className="form-label">
        {title}
      </label>
      <input
        ref={inputRef}
        onChange={onFileSelected}
        type="file"
        className="form-control"
        style={{ display: 'none' }}
      />

      {
        fileContent ?
        <div className = "text-center mx-auto d-block">
            <img style={{
              width: '200px',
              height: '250px',
              'objectFit': 'cover',
            }}
              src={fileContent} alt='selected file' />
          </div>

          :
          <></>
      }

      

    
    </div>
    <div className='d-grid gap-2 col-6 mx-auto text-center'>
        <button onClick={() => {
          inputRef.current.click();
        }} type= "button" className='btn btn-primary'>Upload File</button>
      </div>
    </div>
  )
}