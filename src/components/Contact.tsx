import React, { useState } from "react";

const contactEndpoint:string = "http://127.0.0.1/contact-form/";

type FormState = {
  name: string;
  email: string;
  reason: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  const [validationState, setValidationState] = useState<FormState>({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value, });
    setValidationState({ ...validationState, [e.target.name]: e.target.value ? "" : "Field required", });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newValidationState = {
      name: formState.name ? "" : "Field required",
      email: formState.email ? "" : "Field required",
      reason: formState.reason ? "" : "Field required",
      message: formState.message ? "" : "Field required",
    };

    setValidationState(newValidationState);

    const newMissingFields = Object.entries(newValidationState)
      .filter(([_, value]) => value !== "")
      .map(([key, _]) => key);

    setMissingFields(newMissingFields);

    if (newMissingFields.length > 0) {
      setShowPopup(true);
      return;
    }

    // Send a POST request to the API endpoint
    await fetch(contactEndpoint, {
      method: "POST", 
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(e => console.log(e)); 
 
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="contact-form-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-input">
            <label>Name :</label>
            <input type="text" name="name" onChange={handleChange} className={validationState.name && "contact-form-invalid"} />
            
            <label>Email :</label>
            <input type="email" name="email" onChange={handleChange} className={validationState.email && "contact-form-invalid"} />
            
            <label>Reason :</label>
            <select name="reason" onChange={handleChange} className={validationState.reason && "contact-form-invalid"}>
              <option value=""><i>Select reason</i></option>
              <option value="feedback">General Feedback</option>
              <option value="functionality">Missing Functionality</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="contact-form-message">
            <textarea name="message" placeholder="Your message" onChange={handleChange} className={validationState.message && "contact-form-invalid"} />
          </div>
          
          
          <button className="contact-form-button" type="submit">Submit</button>
          
          {showPopup && missingFields.length > 0 && (
            <div className="contact-form-popup">
              <p>Required fields: {missingFields.join(", ")}</p>
              <button className="contact-form-button" onClick={closePopup}>OK</button>
            </div>
          )}
          {showPopup && missingFields.length == 0 && (
            <div className="contact-form-popup">
              <p>Message submitted</p>
              <button className="contact-form-button" onClick={closePopup}>OK</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
