import '../../styles.scss';
import React, { useState } from 'react';
import apiClient from '../../utils/apiRequestHandler';

const uploadFiles = (files, browserId, successCallback, failureCallback) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    formData.append(`file ${i}`, file)
  }
  formData.append("browserId", browserId)
  apiClient.fileUpload('/pdf/upload', formData)
    .then( pdfDocuments => {
      successCallback(pdfDocuments.data)
    })
    .catch( err => failureCallback(err) )

}

const FileUploadForm = ({ browserId, setUploadCount, uploadCount }) => {

  const [ attachedFileName, setAttachedFileName ] = useState("");
  const [ attachedFiles, setAttachedFiles ] = useState([]);

  return (
    <form method="POST"
          action=""
          onSubmit={ e => {
            e.preventDefault();
            uploadFiles(attachedFiles, browserId,
              () => {
                alert("Success")
                setUploadCount( uploadCount + 1);
              },
              () => alert("Upload Failed"));
            return undefined;
          }}
    >
      <div className="form-group">
        <label htmlFor="file">Pdf File: </label>
        <input type="file"
               multiple={true}
               className="form-control"
               placeholder="Select File" id="file"
               value={attachedFileName}
               onChange={ e => {
                 setAttachedFileName(e.target.value);
                 setAttachedFiles(e.target.files)
               }}
        />
      </div>
      <button type="submit"
              className="btn btn-primary" >Submit</button>
    </form>
  )
}

export default FileUploadForm;
