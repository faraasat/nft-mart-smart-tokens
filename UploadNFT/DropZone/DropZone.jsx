import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import HashLoader from "react-spinners/HashLoader";

//INTRNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../img";

const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  website,
  description,
  royalties,
  fileSize,
  setFileSize,
  category,
  properties,
  setImage,
}) => {
  const [imgFile, setImgFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

  const calculateSize = (size) => {
    if (size > 1024 * 1024) {
      return `${Number(size / (1024 * 1024)).toPrecision(6)} MB`;
    } else {
      return `${Number(size / 1024).toPrecision(6)}KB`;
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    try {
      setFileLoading(true);
      setFileSize(calculateSize(acceptedFile[0].size));
      setImage(acceptedFile[0]);
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFile[0]);
      reader.addEventListener("load", () => {
        setImgFile(reader.result);
      });
      setFileLoading(false);
    } catch (err) {
      setFileLoading(false);
    }
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 10485760, // 10MB
    disabled: fileLoading,
  });

  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <Image
              src={images.upload}
              alt="upload"
              width={100}
              height={100}
              objectFit="contain"
              className={Style.DropZone_box_input_img_img}
            />
            <div className={Style.DropZone_box_loader}>
              <HashLoader
                size={150}
                color="#4c5773"
                loading={fileLoading}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>

      {imgFile && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <div style={{ width: 200, height: 200, border: "1px solid grey" }}>
              <Image src={imgFile} alt="nft image" width={200} height={200} />
            </div>
            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>NFT Name:</span>
                  {name || ""}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Website:</span>
                  {website || ""}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Description</span>
                  {description || ""}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Royalties</span>
                  {royalties || ""}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>FileSize</span>
                  {fileSize || ""}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Properties</span>
                  {properties || ""}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Category</span>
                  {category || ""}
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default DropZone;
