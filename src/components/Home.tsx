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
  "PLY-AI : Use Open Source AI", 
  "Powered by HugginFace Transformers.js",
  "Text Summarization : get the key points of any text", 
  "Object Detection : analyse the content of an image",
  "Document Q&A : ask the AI about your documents", 
  "Text to Audio : generate audio samples from a text description", 
  "Text to SQL : generate SQL queries by description",
]

const Homepage: React.FC = () => {
    return(
      <>
        <NewsTicker headlines={headlines}/>
        <h3>PLY-AI</h3>
        <h4>Access Open Source Large Language Models (LLMs)</h4>
        
        <div className='list-container'>
          <ul><b>The app is currently capable of :</b>
            <li>Text Summarization</li>
            <li>Image Object Detection</li>
            <li>Image Classification</li>
          </ul>  
          
          <ul><b>We are also currently working on :</b>
            <li>Text to SQL</li>
            <li>Text to Audio</li>
            <li>Document Q&A</li>
          </ul>  
        </div>

        <p>
          If you have a feature request, or there is an issue with any part of the application, please use the contact form to let us know. 
        </p>
       
      </>
    )
  };

export default Homepage;
