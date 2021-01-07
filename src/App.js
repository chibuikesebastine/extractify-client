import TextAreaContainer from './components/ExtracteTextArea';
import FileUploadForm from './components/FileUploadForm';
import './App.css';
import { v4 as uuid } from 'uuid'
import { useState } from 'react';

function App() {
  let browserId = localStorage.getItem("broswerId");
  if(!browserId){
    browserId = uuid();
  }

  const [ uploadCount, setUploadCount ] = useState("");

  localStorage.setItem("browserId", browserId)
  return (
    <div className="App">
      <header className="App-header">
        <FileUploadForm browserId={browserId} setUploadCount={setUploadCount} uploadCount={uploadCount}/>
        <TextAreaContainer broswerId={browserId} uploadCount={uploadCount} />
      </header>
    </div>
  );
}

export default App;
