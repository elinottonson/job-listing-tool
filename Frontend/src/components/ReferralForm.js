import React from 'react';
import './../styles/ReferralForm.css';

const ReferralForm = () => {
  return (
    <div class='form-container'>
      <div class="form">
        <div class='column1'>
          <label>
            First Name<input type="text"/>
          </label>
          <label>
            Last Name<input type="text"/>
          </label>
          <label>
            Email<input type="text"/>
          </label>
          <label>
            Phone Number<input type="text"/>
          </label>
        </div>
        <div class='column2'>
          <label>
            Please Briefly Describe the experience of the candidate:
            <textarea/>
          </label>
          <label>
            Briefly describe why you think they would be a good fit for this position:
            <textarea type="text"/>
          </label >
        </div>
      </div>
      <button class='SubmitButton'>Submit</button>
    </div>
  );
};

export default ReferralForm;