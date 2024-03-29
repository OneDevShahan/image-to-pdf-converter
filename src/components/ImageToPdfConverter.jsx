import React, { useState } from "react";
import jsPDF from "jspdf";

const ImageToPdfConverter = () => {
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const convertToPdf = () => {
    if (!imageFile) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const pdf = new jsPDF();
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (img.height * imgWidth) / img.width;
        pdf.addImage(reader.result, "JPEG", 0, 0, imgWidth, imgHeight);
        // Extract filename from image file
        const imageName = imageFile.name;
        pdf.save(imageName.replace(/\.[^/.]+$/, "") + ".pdf");
        setLoading(false); // Set loading state back to false when PDF is ready
      };
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="container my-5">
      <div className="bg-dark text-secondary px-4 py-5 text-center">
        <h1 className="display-5 fw-bold text-white">
          Single image PDF converter
        </h1>
        <div className="col-lg-6 mx-auto text-white">
          <p className="fs-5 mb-4">
            Transform single images into sleek PDFs seamlessly on our website.
            Effortlessly convert your images to professional PDF documents in
            just a few clicks.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <input
              className="btn btn-outline-light btn-lg p-4 fw-bold"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              className="btn btn-outline-success btn-lg px-4"
              disabled={!imageFile || loading}
              onClick={convertToPdf}
            >
              Convert to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageToPdfConverter;
