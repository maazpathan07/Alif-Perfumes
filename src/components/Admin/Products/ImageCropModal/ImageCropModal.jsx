import { useState, useRef, useEffect } from "react";
import { X, Crop, Check, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import styles from "./ImageCropModal.module.css";

function ImageCropModal({ imageFile, onConfirm, onCancel }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 250, height: 250 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  if (!imageFile || !imageSrc) return null;

  const handleUseAsIs = () => {
    onConfirm(imageFile);
  };

  const getCroppedImg = () => {
    const image = imgRef.current;
    if (!image) return imageFile;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Default 600x600 square cropped output for perfumes
    const cropWidth = 600;
    const cropHeight = 600;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cropWidth, cropHeight);

    // Draw centered scaled image
    const scale = Math.max(cropWidth / image.naturalWidth, cropHeight / image.naturalHeight) * zoom;
    const scaledW = image.naturalWidth * scale;
    const scaledH = image.naturalHeight * scale;
    const offsetX = (cropWidth - scaledW) / 2;
    const offsetY = (cropHeight - scaledH) / 2;

    ctx.drawImage(image, offsetX, offsetY, scaledW, scaledH);
    ctx.restore();

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(imageFile);
            return;
          }
          const croppedFile = new File([blob], imageFile.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(croppedFile);
        },
        "image/jpeg",
        0.9
      );
    });
  };

  const handleCropAndSave = async () => {
    const croppedFile = await getCroppedImg();
    onConfirm(croppedFile);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Product Image Preview & Crop</h3>
          <button className={styles.closeBtn} onClick={onCancel} type="button">
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.previewContainer}>
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Preview"
              className={styles.previewImg}
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            />
          </div>

          {isCropping && (
            <div className={styles.controls}>
              <div className={styles.controlGroup}>
                <label><ZoomIn size={16} /> Zoom</label>
                <input
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                />
              </div>

              <div className={styles.controlGroup}>
                <label><RotateCw size={16} /> Rotate</label>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                >
                  Rotate 90°
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          {!isCropping ? (
            <>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setIsCropping(true)}
              >
                <Crop size={18} /> Crop / Adjust Image
              </button>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={handleUseAsIs}
              >
                <Check size={18} /> Use Original Image (OK)
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setIsCropping(false)}
              >
                Reset Crop
              </button>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={handleCropAndSave}
              >
                <Check size={18} /> Apply Crop & Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageCropModal;
