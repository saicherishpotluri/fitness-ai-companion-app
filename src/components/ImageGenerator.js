import React, { useState } from "react";

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imgUrls, setImgUrls] = useState([]);
  const generateImage = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/generate-img?prompt=${prompt}`
      );
      const urls = await response.json();
      setImgUrls(urls);
    } catch (error) {
      console.error("Error generating image: ", error);
    }
  };
  return (
    <div className="tab-content">
      <h2>Image Generator</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for an image"
      />
      <button onClick={generateImage}>Generate Image</button>
      <div className="img-grid">
        {imgUrls.map((url, index) => (
          <img key={index} src={url} alt={`Generated ${index}`} />
        ))}
        {[...Array(4 - imgUrls.length)].map((_, index) => (
          <div key={index + imgUrls.length} className="empty-image-slot"></div>
        ))}
      </div>
    </div>
  );
}

export default ImageGenerator;
