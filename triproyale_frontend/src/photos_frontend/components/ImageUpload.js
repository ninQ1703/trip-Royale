import { none } from "@cloudinary/url-gen/qualifiers/fontHinting";
import { openUploadWidget } from "../utils/CloudinaryService";
import React from 'react'

const ImageUpload = (props) => {
  const user = 1;
  const trip = 1;
  const uploadImageWidget = () => {
    console.log(props);
    let myUploadWidget = openUploadWidget(
      {
        cloudName: props.cloud_name,
        uploadPreset: props.upload_preset,
        tags: ["myname"],
        maxImageWidth: 600,
        sources: ["local", "url", "camera","dropbox","image_search","facebook","instagram","shutterstock","gettyimages","istock","unsplash","google_drive"],
        styles:{
          palette: {
            window: "#E28616",
            windowBorder: "black",
            tabIcon: "#FFFFFF",
            menuIcons: "#FFFFFF",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link:  "#FF900B",
            action:  "#FF620C",
            inactiveTabIcon: "#FFFFFF",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#FFFFFF"
          },
          frame: {
            background: "#0E2F5B99"
          }
          
        },
      },
      function (error, result) {
        if (!error && result.event === "success") {
          
          fetch(`http://127.0.0.1:8000/${user}/${trip}/photos/upload/`, {
            method: 'POST',
            body: JSON.stringify({
              src:result.info.url,
              trip: trip,
              uploader: user,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((res) => res.json()).then((pic) => {console.log(pic); return props.onImageUpload(pic)})
            .catch((err) => {
              console.log(err.message);
            });
          console.log(result.info.url);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button onClick={uploadImageWidget} style={{ backgroundColor: '#FF900B', fontSize: '100%', borderRadius: '7px', width: '10%', height: '80%', borderWidth: "1px", color: "#FFFFFF" }}>
      Upload
    </button>
  );
};

export default ImageUpload;
