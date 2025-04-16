import React, { useEffect, useState } from 'react';
import { fetchImages } from '../services/upload';

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchImages();
        console.log('Fetched images:', data);
        setImages(data);
      } catch (err) {
        setError('Failed to load images. Please check your connection and try again.');
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red' }}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>📄 Uploaded Images</h2>
      {images.length === 0 ? (
        <p>No images uploaded yet.</p>
      ) : (
        images.map((img) => (
          <div key={img._id} style={{ marginBottom: '12px' }}>
            <em>{img.event}</em> - <strong>{img.filename}</strong> 
            {img.status === 'completed' && img.resizedPath && (
              <div>
                {/* <img
                  src={`http://localhost:3000/${img.resizedPath}`}
                  alt="Resized"
                  style={{ maxWidth: '200px', marginTop: '8px' }}
                /> */}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ImageList;