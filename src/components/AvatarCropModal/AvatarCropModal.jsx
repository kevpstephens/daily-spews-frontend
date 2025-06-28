import "./AvatarCropModal.css";
import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
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

  const onCropCompleteInternal = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedBlob);
  };

  return (
    <div className="modal-backdrop">
      <div className="cropper-container">
        {/* 🆕 Add title */}
        <h3 className="crop-modal-title">{title}</h3>

        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio} // 🆕 Use prop instead of hardcoded 1
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteInternal}
          cropShape={cropShape} // 🆕 Use prop instead of hardcoded "round"
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
