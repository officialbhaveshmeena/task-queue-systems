// src/components/ImageUploader.jsx

import React, { useRef, useState } from 'react';
import { uploadImage } from '../services/upload';

const ImageUploader = () => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [filename, setFilename] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadImage(file);
      setFilename(res.filename);
    } catch (err) {
      console.error('Upload failed', err);
    }
    setUploading(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      style={{
        border: '2px dashed #aaa',
        padding: '40px',
        textAlign: 'center',
        borderRadius: '10px',
        marginBottom: '30px',
        cursor: 'pointer',
      }}
      onClick={triggerFileInput}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
      {uploading ? (
        <p>Uploading...</p>
      ) : filename ? (
        <p>✅ Uploaded: <strong>{filename}</strong></p>
      ) : (
        <p>Click or drag an image file to upload</p>
      )}
    </div>
  );
};

export default ImageUploader;
