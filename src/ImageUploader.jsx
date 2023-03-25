import React, { useState } from "react";
import {Input} from "@chakra-ui/react";

function App() {
    const [image, setImage] = useState(null);
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(400);
    const [href, setHref] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    const handleWidthChange = (e) => {
        setWidth(e.target.value);
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    const handleHrefChange = (e) => {
        setHref(e.target.value);
    };

    const imageStyle = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };

    return (
        <div>
            <Input type="file" onChange={handleImageUpload} />
            <div>
                <label htmlFor="width">Width: </label>
                <Input id="width" type="number" value={width} onChange={handleWidthChange} />
            </div>
            <div>
                <label htmlFor="height">Height: </label>
                <Input id="height" type="number" value={height} onChange={handleHeightChange} />
            </div>
            <div>
                <label htmlFor="href">Link: </label>
                <Input id="href" type="text" value={href} onChange={handleHrefChange} />
            </div>
            <div style={imageStyle}>
                <a href={href} style={{ display: "block", height: "100%" }} />
            </div>

        </div>
    );
}

export default App;
