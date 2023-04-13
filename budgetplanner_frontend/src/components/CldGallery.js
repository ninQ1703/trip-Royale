import Photo from "../components/CldPhoto";
import React from 'react'

const CldGallery = (props) => {
  return (
    <div className="photos">
      {!props.imagesUploaded && props.imagesUploaded.length === 0 && (
        <p>No photos were added yet.</p>
      )}
      {props.imagesUploaded &&
        props.imagesUploaded.length !== 0 &&
        props.imagesUploaded.map((publicId) => {
          return (
            <Photo
              key={publicId}
              publicId={publicId}
              cloudName={props.cloud_name}
            />
          );
        })}
    </div>
  );
};

export default CldGallery;
