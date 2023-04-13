import './App.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { Helmet } from "react-helmet"
import * as React from 'react';
import CldGallery from "./components/CldGallery";
import { Cloudinary } from "@cloudinary/url-gen";
import ImageUpload from "./components/ImageUpload";
import { Collapse } from 'react-collapse';
import ye from './Credit_card_bro.png'

function App() {
    const [imagesUploadedList, setImagesUploadedList] = useState([]);

    const cld = new Cloudinary({
        cloud: {
            cloud_name: "djmd3cojf", //Your cloud name
            upload_preset: "ckmtjuww" //Create an unsigned upload preset and update this
        }
    });

    const onImageUploadHandler = (publicId) => {
        setImagesUploadedList((prevState) => [...prevState, publicId]);
    };

    const deleteAllImages = async () => {
        try {
            //You can call an API in your backend if you want to delete images.
            //This is the API you should call:
            //https://cloudinary.com/documentation/image_upload_api_reference#destroy
            // const responseData = await fetch(
            //   "http://localhost:5000/api/photos/delete"
            // );
            setImagesUploadedList([]);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <Helmet>
                <script
                    src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"
                ></script>
            </Helmet>
            <div className="App">
                <button className="redButton" onClick={deleteAllImages}>
                    Delete all images
                </button>
                <ImageUpload
                    cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
                    upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
                    onImageUpload={(publicId) => onImageUploadHandler(publicId)}
                />
                <p>
                    This mini project demonstrates the use of Upload widget +
                    transformations on uploaded images in responsive way useing hooks in
                    React
                </p>
                <CldGallery
                    imagesUploaded={imagesUploadedList}
                    {...cld}
                    cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
                />
            </div>
        </>

    );
}

export default App;