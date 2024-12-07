'use client';
import { useRef, useState, useEffect } from "react";
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name, value, onChange }) {
    const [imagePicked, setImagePicked] = useState(null); // Store the image file or URL
    const [previewUrl, setPreviewUrl] = useState(null); // Store preview URL
    const imageRef = useRef();

    // Set the initial image if provided (for editing or preloading)
    useEffect(() => {
        if (value) {
            setImagePicked(value); // Set the initial image if passed via props
            setPreviewUrl(value); // Set the preview URL from initial value
        }
    }, [value]);

    function handleRef() {
        imageRef.current.click(); // Trigger file input when button is clicked
    }

    function handleImageChange(event) {
        const file = event.target.files[0]; // Get the selected file
        console.log('file:',file);
        if (!file) {
            setImagePicked(null);
            setPreviewUrl(null);
            onChange(null); // Inform parent that no file is selected
            return;
        }

        // Set file for the preview (optional)
        setImagePicked(file); // Store the selected file
        console.log('imagePicked:',imagePicked)
        // Create and set preview URL using FileReader for better performance
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result); // Set the preview URL once the file is loaded
        };
        reader.readAsDataURL(file); // Convert the file to a data URL for preview
        //console.log('preview url:',previewUrl);
        // Pass the file directly to parent via onChange for uploading
        onChange(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!previewUrl && <p>No image picked yet</p>}
                    {previewUrl && (<img src={previewUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />)}
                </div>
                <input
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg, image/jpg"
                    name={name}
                    className={classes.input}
                    ref={imageRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }} // Hide the file input element
                />
            </div>
            <button className={classes.button} type="button" onClick={handleRef}>Add Image</button>
        </div>
    );
}
