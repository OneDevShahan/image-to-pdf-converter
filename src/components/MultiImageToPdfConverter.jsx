import React, { useRef, useState } from 'react'
import jsPDF from 'jspdf';

const MultiImageToPdfConverter = () => {
const [imageFiles, setImageFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setImageFiles(filesArray);
  };

    const clearFiles = () => {
    setImageFiles([]);
    // Reset the input element value to clear the selected files
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.form.reset();
    }
    };

  const convertToPdf = () => {
    if (imageFiles.length === 0) return;
    setLoading(true);
    const pdf = new jsPDF();

    imageFiles.forEach((imageFile, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (img.height * imgWidth) / img.width;

          // Add image to a new page in PDF
          if (index !== 0) {
            pdf.addPage();
          }

          pdf.addImage(reader.result, 'JPEG', 0, 0, imgWidth, imgHeight);
          
          // Save PDF when all images are added
          if (index === imageFiles.length - 1) {
            pdf.save('converted.pdf');
            setLoading(false); // Set loading state back to false when PDF is ready
          }
        };
      };
      reader.readAsDataURL(imageFile);
    });
  };
    
  
  return (
    <div>
        <div class="container my-5 text-light">
            <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center">
                <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
                    <h1 class="display-4 fw-bold lh-1">Multiple image PDF converter</h1>
                    <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <input className="btn btn-outline-light btn-lg p-4 fw-bold" type="file" accept="image/*" multiple onChange={handleFileChange} />
                            <button className= "btn btn-outline-success btn-lg px-4" disabled={imageFiles.length === 0 || loading} onClick={convertToPdf}>
                                {loading ? 'Converting...' : 'Convert to PDF'}
                                </button>                               
                            {/* <button className= "btn btn-outline-success btn-lg px-4" disabled={imageFiles.length === 0} onClick={clearFiles}>Clear Files</button> */}
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                    <img class="rounded-lg-3" src="bootstrap-docs.png" alt="" width="720"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MultiImageToPdfConverter;
