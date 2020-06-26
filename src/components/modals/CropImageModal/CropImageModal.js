import React, { useState, useContext } from "react";
import { Modal, ModalBody, Button, Form, FormGroup, Input } from "reactstrap";
import ReactCrop from "react-image-crop";
import { withRouter } from "react-router-dom";

import MainContext from "../../../context/mainContext";

import "react-image-crop/dist/ReactCrop.css";
import "./CropImageModal.css";

const CropImageModal = (history) => {
  const [modal, setModal] = useState(false);
  const [srcFile, setSrcFile] = useState("");
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,
    x: 0,
    y: 0,
    unit: "px",
    aspect: 1,
  });
  const [imageRef, setImageRef] = useState("");
  const [croppedImageUrl, setCroppedImageUrl] = useState("");

  const toggle = () => setModal(!modal);

  const fileInputRef = React.createRef();

  const onSelectImageFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrcFile(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const cropImageFile = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imageRef, crop, "newFile.jpeg");
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        console.log(fileName);
        window.URL.revokeObjectURL(croppedImageUrl);
        const newURL = window.URL.createObjectURL(blob);
        resolve(newURL);
        // console.log(newURL);
        // setFileUrl(newURL);
        // console.log(fileUrl);
        // resolve(fileUrl);
      }, "image/jpeg");
    });
  };

  const onImageLoaded = (image) => {
    setImageRef(image);
  };
  const onCropComplete = (crop) => {
    cropImageFile(crop);
  };
  const onCropChange = (crop) => {
    console.log("onCropChange");
    // setCrop(crop);
  };

  return (
    <div>
      <Button
        style={{
          backgroundColor: "white",
          color: "#3D77FF",
          borderColor: "#3D77FF",
          boxShadow: "none",
          width: "193px",
          height: "32px",
          fontSize: "14px",
          marginTop: "15px",
          borderRadius: "5px",
        }}
        onClick={() => {
          // Clicked "Upload Profile Picture"
          fileInputRef.current.click();
        }}
      >
        <div>Upload Profile Picture*</div>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            onSelectImageFile(e);
            toggle();
          }}
        />
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalBody className="react-crop">
          <div>
            <ReactCrop
              style={{
                width: "800px",
                height: "450px",
              }}
              src={srcFile}
              crop={crop}
              ruleOfThirds
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
          </div>
          <div>
            {croppedImageUrl && (
              <img alt="Crop" style={{ width: "100px", height: "100px" }} src={croppedImageUrl} />
            )}
            <Button
              style={{
                backgroundColor: "white",
                color: "#3D77FF",
                borderColor: "#3D77FF",
                boxShadow: "none",
                width: "193px",
                height: "32px",
                fontSize: "14px",
                marginTop: "15px",
                borderRadius: "5px",
              }}
              onClick={() => {}}
            >
              <div>Crop Image</div>
            </Button>
            <div></div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(CropImageModal);
