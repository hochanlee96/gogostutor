import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../shared/context/auth-context";
import { UserContext } from "../../../../shared/context/user-context";
import AWS from "aws-sdk";

import classes from "./ProfileBox.module.css";
import EmptyUserImage from "../../../../shared/assets/icons/user.png";
import { CiEdit } from "react-icons/ci";
const { REACT_APP_AWS_S3_ACCESS_KEY, REACT_APP_AWS_S3_SECRET_KEY } =
  process.env;

const ImageUploader = ({ imageURL }) => {
  const [file, setFile] = useState(null);
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const updateProfileData = user.updateProfileData;
  const [id, setId] = useState(null);
  const accessKey = REACT_APP_AWS_S3_ACCESS_KEY;
  const secretKey = REACT_APP_AWS_S3_SECRET_KEY;
  const [previewURL, setPreviewURL] = useState(null);

  useEffect(() => {
    if (auth) {
      setId(auth.id);
    }
  }, [auth]);

  const uploadFile = async () => {
    const S3_BUCKET = "gogosedu";
    const REGION = "ap-northeast-2";

    AWS.config.update({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    const fileName = `profile_image_${id}`;

    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      //   Key: file.name,
      Body: file,
    };
    try {
      await s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
        })
        .promise();

      alert("File uploaded successfully.");
      await updateProfileData({
        imageURL: `https://gogosedu.s3.ap-northeast-2.amazonaws.com/${fileName}`,
      });
      window.location.reload();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file.");
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
      <div>
        <label className={classes.ImageWrapper}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <img
            src={previewURL || imageURL || EmptyUserImage}
            alt="Profile"
            className={classes.UserIcon}
          />
          <CiEdit className={classes.EditIcon} size="30px" />
        </label>
      </div>
      {file ? (
        <div style={{ display: "flex", gap: "10px" }}>
          <div>{file.name}</div>
          <div className={classes.UploadButton} onClick={uploadFile}>
            Upload
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageUploader;
