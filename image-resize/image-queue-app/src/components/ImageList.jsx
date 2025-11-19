import React, { useEffect, useState } from "react";
import { deleteImage, fetchImages } from "../services/upload";
import "./ImageList.css";
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
        console.log("Fetched images:", data);
        setImages(data);
      } catch (err) {
        // setError(
        //   "No Uploads yet"
        // );
        console.error("Error fetching images:", err);
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
      <div style={{ color: "red" }}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const handleDownload = async (img) => {
    //   const a = document.createElement('a');
    // a.href = `http://localhost:4500/`;
    // a.setAttribute('download', img.filename);
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);

    try {
      const response = await fetch(img.resizedPath, {
        method: "GET",
        mode: "cors", // important for cross-domain
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = img.filename; // this controls the downloaded file name
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteImage(id);
      // await fetch(`http://localhost:3000/images/${id}`, {
      //   method: 'DELETE'
      // });

      // remove from UI
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const buttonStyles = {
    download: {
    //   padding: "6px 12px",
      marginRight: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
    //   borderRadius: "4px",
      cursor: "pointer",
    },
    delete: {
    //   padding: "6px 12px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
    //   borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
	<>
	 <h2 className="image__info">Uploaded Images</h2>
    <div className="main__container">
      {images.length === 0 ? (
        <p>No images uploaded yet.</p>
      ) : (
        images.map((img) => (
          <div
            className="card__wrapper"
            key={img.id}
            style={{ marginBottom: "16px", borderBottom: "1px solid #ddd" }}
          >
            <div className="image__info">
              <strong>{img.status}</strong> - <strong>{img.filename}</strong>
            </div>
            <div className="image_button_wrapper">
              {img.status === "completed" && img.resizedPath && (
                <div className="image__wrapper">
                  <img src={`${img.resizedPath}`} alt="Resized" />
                </div>
              )}
              {/* Buttons */}
              <div className="action__buttons">
                <button
                  onClick={() => handleDownload(img)}
                  style={buttonStyles.download}
                >
                  Download
                </button>

                <button
                  onClick={() => handleDelete(img.id)}
                  style={buttonStyles.delete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
	</>
     
  );
};

export default ImageList;
