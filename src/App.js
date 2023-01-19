import React, {useCallback, useState, useRef} from 'react';
import './App.css';
import {
  JsonTree,
} from 'react-editable-json-tree'


function App() {
  const [solastaCampaign, setSolastaCampaign] = useState({});
  
  function readFile(input) {
    let file = input.files[0];
  
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
       setSolastaCampaign(JSON.parse(reader.result));
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
  
  }

  function downloadFile(file) {
    // Create a link and set the URL using `createObjectURL`
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = URL.createObjectURL(file);
    link.download = file.name;
  
    // It needs to be added to the DOM so it can be clicked
    document.body.appendChild(link);
    link.click();
  
    // To make this work on Firefox we need to wait
    // a little while before removing it.
    setTimeout(() => {
      URL.revokeObjectURL(link.href);
      link.parentNode.removeChild(link);
    }, 0);
  }

  const download = () => {

    const myFile = new File([JSON.stringify(solastaCampaign)], "moddedSolastaCampaign.json");
    downloadFile(myFile);
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Solasta Copy Editor</h1>
      </header>
      <div>
        
        <p><strong>Step 1</strong></p>
        <p>Upload your Campaign file</p>
        <p><input type="file" onChange={(event) => readFile(event.target)} /></p>
        <p><strong>Step 2</strong></p>
        <p>Edit Campaign File: these are all the instances of verbiage.</p>
        <p>Ideally your web browser is spell checking it with little red lines.</p>
        <JsonTree 
          data={solastaCampaign}
          allowFunctionEvaluation={false}
          onFullyUpdateData={(data) => setSolastaCampaign(data)}
          textareaElement={<textarea style={{padding: '20px', minWidth: '300px', display: 'block', margin:'auto'}}/>}
          editButtonElement={<button>Apply</button>}
          cancelButtonElement={<button>Cancel</button>}
          inputElement={<input style={{padding: '4px'}}/>}

          // getStyle={(keyName) => {
          //   if (keyName === 'description') {
          //     return {
          //       color: 'red'
          //     };
          //   }
          //   return {};
          // }}

         />

        <p><strong>Step 3</strong></p>
        <p>Download your Campaign file</p>
        <button onClick={download}>Download</button>
      </div>
    </div>
  );
}

export default App;
