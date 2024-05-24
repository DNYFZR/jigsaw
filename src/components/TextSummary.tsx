// Text Summerization Component
import React, { useState } from "react";
import { env, pipeline, PipelineType, SummarizationOutput} from "@xenova/transformers";

env.allowLocalModels = false;

const TextSummary: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [modelOutput, setModelOutput] = useState<string | null>(null);
  const [modelRunning, setModelRunning] = useState<boolean>(false);
  
  const aiTask:PipelineType = "summarization";
  const aiModel:string = "Xenova/distilbart-cnn-6-6";
  
  const modelResponse = async(userInput:string, charLimit:number=1_000) => {
    const generator = await pipeline(aiTask, aiModel);
    return await generator(userInput, {min_new_tokens: charLimit}) as SummarizationOutput;
  };

  const clickRun = async() => {
    setModelOutput(null);
    setModelRunning(true);
    await modelResponse(userInput).then(res => setModelOutput(res[0].summary_text));
    setModelRunning(false);
  };

  const clickClearResult = () => {
    setModelOutput(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setUserInput(e.target.value.replace("\n\n", " "));
  };

  return(
    <div>
      <div>
        <textarea className="text-summary-input" placeholder="Your text..." onChange={handleChange} />
      </div>
      <button className="text-summary-button" onClick={clickRun}>Run</button>
      <button className="text-summary-button" onClick={clickClearResult}>Clear</button>

      {modelRunning === true ?
          <h3>Generating Summary...</h3> : null
      }

      {modelOutput !== null ?
        <div>
          <h2>Summary</h2> 
          <textarea className="text-summary-output">{JSON.stringify(modelOutput)}</textarea>
        </div> 
        : null 
      }  
    </div>
  );
};

export default TextSummary;