import Photo from "./CldPhoto";
import React from 'react'
import { useEffect, useState } from "react"
import { initLightboxJS } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
import { Image } from "lightbox.js-react"

const CldGallery = (props) => {
  
  useEffect(() => {
    initLightboxJS("609C-52DA-37DC-11B6", "individual");
  }, [])

  return <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: "center", marginLeft: '8%', marginRight: '7%' }}>
    {!props.imagesUploaded && props.imagesUploaded.length === 0 && (
      <p >No photos were added yet.</p>
    )}
    {props.imagesUploaded &&
      props.imagesUploaded.length !== 0 &&
      props.imagesUploaded.map((pic) => {
        return (
          <div style={{ padding: '5px', width: '340px', height: '500px' }}>
            <Image image={{ src: pic.src, title: "Cyberpunk", }} />
          </div>
        );
      })}
  </div>
}
export default CldGallery;
