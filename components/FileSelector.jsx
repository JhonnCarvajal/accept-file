import { useState } from "react";



const FileSelector = () => {

  const [files, setFile] = useState([]);
  const handleOnchage = async ({ target }) => {
    const file = target.files[0];
    const { name: actualFileName } = file;
    if (files.find((file) => file.name === actualFileName)) {
      console.log("tya existe un archivo con ese nombre");
      return;
    }
    console.log({ actualFileName });   
    setFile((prev) => [...prev, file]);
  };
  return (
    <div>
      <label htmlFor="formFileLg" className="form-label">
        Select a Portable executable (PE) file
      </label>
      <input
        className="form-control form-control-lg"
        id="formFileLg"
        type="file"
        onChange={handleOnchage}
        accept=".acm , .ax , .cpl , .dll , .drv , .efi , .exe , .mui , .ocx , .scr , .sys , .tsp"
      />
      <ul>
        {files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
   // your fetch function here 

  return {
    props: {
      
    }
  }
}

export default FileSelector;
