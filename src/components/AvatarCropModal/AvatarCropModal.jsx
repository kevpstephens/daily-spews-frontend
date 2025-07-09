/** ============================================================
 *! AvatarCropModal.jsx
 *
 * Modal component for cropping user avatar images using react-easy-crop.
 * Accepts an image source, cropping config, and returns a cropped image blob.
 *============================================================ */

import "./AvatarCropModal.css";
import PropTypes from "prop-types";
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
          aspect={aspectRatio} // Customisable crop aspect ratio (default: 1)
          crop={crop}
          cropShape={cropShape} // Shape of the crop area ("round" or "rect")
          image={imageSrc}
          zoom={zoom}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteInternal}
          onZoomChange={setZoom}
        />

        <div className="crop-modal-buttons">
          <button
            className="crop-cancel-button"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="crop-done-button"
            type="button"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

//! ===================================================== */
//! Prop types
//! ===================================================== */
AvatarCropModal.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCropComplete: PropTypes.func.isRequired,
  aspectRatio: PropTypes.number,
  cropShape: PropTypes.oneOf(["round", "rect"]),
  title: PropTypes.string,
};

AvatarCropModal.defaultProps = {
  aspectRatio: 1,
  cropShape: "round",
  title: "Crop Image",
};
