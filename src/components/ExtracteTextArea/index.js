import TextArea from './TextArea'
import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiRequestHandler';

const fetchPdf = (browserId, successCallback, failureCallback) => {
  apiClient.get(`/pdf/browser/${browserId}`)
    .then( pdfDocuments => {
      successCallback(pdfDocuments.data)
    } )
    .catch( err => failureCallback(err) )

}

const Container = ({ broswerId, uploadCount }) => {
  const [pdfDocuments, setPdfDocuments] = useState([]);

  useEffect(() => {
    fetchPdf(broswerId, setPdfDocuments, () => alert("Could not fetch data."));
  }, [broswerId, uploadCount])

  return (
    <div className="extractedTextAreaContainer">
      {
        pdfDocuments && pdfDocuments.length > 0
          ? pdfDocuments.map( (pdfDocument, i) => (<TextArea value={pdfDocument.pdfText} key={i}/>))
          : "No extracted pdfs to display"
      }
    </div>
  );
};

export default Container;
