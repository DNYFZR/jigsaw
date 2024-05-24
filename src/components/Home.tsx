import React from 'react';

interface NewsProps {
  headlines: string[];
}

const NewsTicker: React.FC<NewsProps> = ({ headlines }) => {
  return (
    <div className="headline-bar">
      <p className="headline">
        {headlines.map((headline, index) => (
          <span key={index}>
            {headline} {index < headlines.length - 1 && <b> • </b>}
          </span>
        ))}
      </p>
    </div>
  );
};

const headlines = [
  "JIGSAW : Use Open Source AI", 
  "Powered by HugginFace Transformers.js",
  "Text Summarization : get the key points of any text", 
  "Image Analyser : analyse & summarise the content of an image",
]

const Homepage: React.FC = () => {
    return(
      <>
        <NewsTicker headlines={headlines}/>
        <h4>Open Source AI Tools User Interface</h4>
        
        <div className='list-container'>
          <ul><b>The app is currently capable of :</b>
            <li>Text Summarization</li>
            <li>Image Object Detection</li>
            <li>Image Classification</li>
          </ul>  
        </div>

        <div className='list-container'>
          <ul><b>We are also currently working on :</b>
            <li>Document Q&A</li>
            <li>Text to SQL</li>
            <li>Text to Audio</li>
          </ul>  
        </div>       
      </>
    )
  };

export default Homepage;
