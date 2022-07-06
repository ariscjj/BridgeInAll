import { useEffect, useRef, useState } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import { PDF } from "./Pdf";
import "./PdfInput.css";
import Alert from "../Alert";



const PdfInput = ({
  pdf,
  onChange,
  label,
  maxKb,
  // required,
  // disabled,
  className,
  error,
}) => {
  const pdfFileInput = useRef(null);
  const pdfHolder = useRef(null);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(error || "");
  const [width, setWidth] = useState(null);

  const onFileSelected = (event) => {
    event.stopPropagation();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (maxKb && file.size / 1000 > maxKb) {
        setErr("This file is too large, Max Size is " + maxKb + "Kb");
        event.target.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        pdf.file = file;
        pdf.fileUrl = e.target.result;
      };

      reader.onloadstart = (e) => {
        setLoading(true);
      };

      reader.onerror = (e) => {
        setErr(e.target.error);
      };

      reader.onloadend = (e) => {
        setLoading(false);
      };

      reader.readAsArrayBuffer(file);
      event.target.value = "";
    }
  };

  const clear = () => {
    onChange(new PDF());
  };

  useEffect(() => {
    if (pdfHolder && pdfHolder.current) {
      setWidth(pdfHolder.current.clientWidth);
    }
  }, [pdfHolder]);

  return (
    <div ref={pdfHolder} className={"app-pdf-input " + className}>
      <div className="bold">{label}</div>

      {!pdf.fileUrl && !loading ?
        <div className="d-flex justify-content-center mt-2">
          <button
            type="button"
            className="btn btn-small"
            onClick={() => pdfFileInput.current.click()}
          >
            Choose PDF
          </button>
        </div> : 
        <></>
}

      {pdf.fileUrl && !loading && width ?
        <div> <div className="pdf-holder">
          <Document className="pdf" file={pdf.file ? pdf.file : pdf.fileUrl}>
            <Page width={width} pageNumber={1} />
          </Document>
        </div>

        <div className="d-flex justify-content-center mt-2">
          <button
            type="button"
            className="btn btn-small"
            onClick={() => clear()}
          >
            Clear PDF
          </button>
        </div> 
        </div>
        :
        <></>
      }



      <input
        ref={pdfFileInput}
        type="file"
        onChange={(e) => onFileSelected(e)}
        accept=".pdf"
      />

      <Alert className="mt-4 mb-0" show={err} onHide={() => setErr("")} >{err}</Alert>
    </div>
  );
};
export default PdfInput;