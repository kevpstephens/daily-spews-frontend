import "./AvatarCropModal.css";
import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import getCroppedImg from "../../utils/getCroppedImg";

export default function AvatarCropModal({
  imageSrc,
  onCancel,
  onCropComplete,
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
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteInternal}
          cropShape="round"
        />
        <button onClick={handleDone}>Done</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
