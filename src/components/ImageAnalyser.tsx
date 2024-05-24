import React, { useState } from 'react';
import { ImageClassificationSingle, ImagePipelineInputs, ObjectDetectionPipelineSingle, ImageToTextSingle, pipeline } from '@xenova/transformers';

const ImageAnalyser = () => {
  const [modelRunning, setModelRunning] = useState<boolean>(false);

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const [imageClass, setImageClass] = useState<ImageClassificationSingle | null>(null);
  const [imageObjects, setImageObjects] = useState<ObjectDetectionPipelineSingle[] | null>(null);
  const [imageText, setImageText] = useState<ImageToTextSingle[] | null>(null);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageClass(null);
    setImageObjects(null);
    setImageText(null);

    const file = event.target.files;
    if (file !== null) {
      setImage(file[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file[0]);
    }
  };

  const runModel = async () => {
    if (image !== null) {
      // Clear previous outputs & init run state
      setImageClass(null);
      setImageObjects(null);
      setImageText(null)
      setModelRunning(true);

      // Run image to text pipeline
      const aiTextModel = await pipeline("image-to-text", "Xenova/vit-gpt2-image-captioning");
      const textResult = await aiTextModel(imageUrl as ImagePipelineInputs);
      setImageText(textResult as ImageToTextSingle[]);

      // Run image classification pipeline
      const aiClassModel = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
      const classResult = await aiClassModel(imageUrl as ImagePipelineInputs);
      setImageClass(classResult[0] as ImageClassificationSingle);
    

      // Run object detection pipeline
      const aiObjectModel = await pipeline("object-detection", "Xenova/detr-resnet-50");
      const objectResult = await aiObjectModel(imageUrl as ImagePipelineInputs);
      setImageObjects(objectResult as ObjectDetectionPipelineSingle[]);

      // End run
      setModelRunning(false);
    }
  };

  return (
    <>
      {imageUrl && <img className='ia-image' src={imageUrl} alt="Uploaded Image" />}  

      <label className='ia-file-upload'>
        <input type="file" onChange={(e) => handleImageChange(e)} />
        Upload Image
      </label>
      {image !== null ? <button className='text-summary-button' onClick={runModel}>Analyse</button> : null }
      
      {modelRunning === true ? <h3>Analysing...</h3>: null}

      <div className='ia-results'>
        {imageText && <p><b>Description :</b> {imageText[0].generated_text}</p>}
      </div>

      <div className='ia-results'>
        {imageClass && <p><b>Classification :</b> {imageClass["label"]} ({(100 * imageClass["score"]).toFixed(0)}%) </p>}
      </div>

      <div className='ia-results'>
        {imageObjects && imageObjects.filter((item, _) => item.score > 0.9).length > 0 && 
        <p><b>Detected Objects :</b>
          <ul> 
            {imageObjects.filter((item, _) => item.score > 0.9).map((item, _) => <li>{item.label} ({(100 * item.score).toFixed(0)}%) </li> )}
          </ul>
        </p>
        }
      </div>
    </>
  );
};

export default ImageAnalyser;