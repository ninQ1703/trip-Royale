import { useState } from 'react';
import { Helmet } from "react-helmet"
import * as React from 'react';
import CldGallery from './components/CldGallery'
import { Cloudinary } from "@cloudinary/url-gen";
import ImageUpload from "./components/ImageUpload";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import SideBar from '../SideBar/Sidebar';
const Gallery=(props) => {
    const [imagesUploadedList, setImagesUploadedList] = useState([]);
    const [images, setImages] = useState([]);
    const location = useLocation();
    const { trip } = location.state;
    const { user } = location.state;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/${user}/${trip}/photos/`);
            const newPhotosList = await response.json();
            setImages(newPhotosList);
        };
        fetchData();
    }, [])
    const cld = new Cloudinary({
        cloud: {
            cloud_name: "djmd3cojf",
            upload_preset: "ckmtjuww"
        }
    });

    const onImageUploadHandler = (photoObject) => {
        setImages((prevState) => [...prevState, photoObject]);
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
            <SideBar trip={trip} user={user}/>
                <div style={{
                    position: "fixed", backgroundColor: "#F6AD52", color: "#000000", minHeight: '2.77em',
                    top: '2.88em', width: '100%', zIndex: '3'
                }}>
                    <div style={{ fontSize: "1.5em", textAlign: "center", fontWeight: "2em", maxHeight: "60px", marginLeft: "3%", paddingTop: ".5%", paddingBottom: ".3%" }}>
                        GALLERY
                    </div>
                </div>
                <CldGallery
                    imagesUploaded={images}
                    {...cld}
                    cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
                />
                <div style={{ position: "fixed", bottom: '0%', width: "100%", height: "7%", zIndex: "3", backgroundColor: "#FFFFFF", paddingTop: "1%" }}>
                    {/* <button className="redButton" onClick={deleteAllImages}>
                    Delete all images
                </button> */}
                    <ImageUpload
                        cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
                        upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
                        onImageUpload={(photoObject) => onImageUploadHandler(photoObject)}
                        user={user}
                        trip={trip}
                    />
                </div>
            </div>
        </>

    );
}

export default Gallery;