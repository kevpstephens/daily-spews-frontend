/** ============================================================
 * AvatarCropModal.jsx
 *
 * Modal component for cropping user avatar images using react-easy-crop.
 * Accepts an image source, cropping config, and returns a cropped image blob.
 *============================================================ */

import "./AvatarCropModal.css";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/getCroppedImg";

export default function AvatarCropModal({
  imageSrc,
  onCancel,
  onCropComplete,
  aspectRatio = 1,
  cropShape = "round",
  title = "Crop Image",
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Internal handler to capture pixel dimensions of the cropped area
  const onCropCompleteInternal = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // Generate cropped image blob and trigger onCropComplete
  const handleDone = async () => {
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedBlob);
  };

  return (
    <div className="modal-backdrop">
      <div className="cropper-container">
        {/* Modal title */}
        <h3 className="crop-modal-title">{title}</h3>

        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio} // Customizable crop aspect ratio (default: 1)
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteInternal}
          cropShape={cropShape} // Shape of the crop area ("round" or "rect")
        />

        <div className="crop-modal-buttons">
          <button className="crop-cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="crop-done-button" onClick={handleDone}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
