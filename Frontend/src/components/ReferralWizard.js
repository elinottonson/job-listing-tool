import StepWizard from 'react-step-wizard';
import React from'react';
import { isValidEmail } from '../lib/Validation';
import './../styles/ReferralWizard.css';

/*
  Sample Job Listing Object
  {
    "id": 52,
    "title": "Software Engineer I",
    "companyName": "Techgenix",
    "description": "Entry level Software Engineering role on an Agile team",
    "minYearsExperience": 0,
    "managerId": 111,
    "salary": 66880,
    "tags": [
      "Git",
      "SQL",
      "MongoDB",
      "Jenkins"
    ],
    "createdAt": "2021-10-14T18:40:02.987Z",
    "updatedAt": "2021-10-14T18:40:02.987Z"
  }
*/

const ReferralWizard = ({ setOpenReferral, listingObj }) => {

  const [userInput, setUserInput] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      referralText: '',
      listingId: listingObj.id,
      companyName: listingObj.companyName,
      authorId: ''
  });

  // Called on every onChange event
  const handleChange = (event) => {
    const name = event.target.name.trim();
    const value = event.target.value.trim();
    setUserInput(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenReferral(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StepWizard transitions='nothing'>
        <CandidateName userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <ContactInfo userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <CandidateDescription userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
      </StepWizard>
    </form>
  );
};

// TODO: display error message when conditions for moving to the next step have not been met
const CandidateName = (props) => {
  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (props.userInput.firstName !== '' && props.userInput.lastName !== '') {
      props.nextStep();
    }
  };

  return (
    <div className = 'name-container'>
      <label>
        First Name<input type="text" name='firstName' onChange={props.handleChange} />
      </label>
      <label>
        Last Name<input type="text" name='lastName' onChange={props.handleChange} />
      </label>
      <button className = 'nextButton' type='button' onClick={filledRequired}>Next Step</button>
    </div>
  );
};

const ContactInfo = (props) => {
  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (isValidEmail(props.userInput.email)) {
      props.nextStep();
    }
  };

  //Get contact info of referral -- used to contain phone number but our database currently doesn't handle that
  return (
    <div className= 'email-container'>
      <label>
        Email<input type='email' name='email' onChange={props.handleChange} />
      </label>
      <button className = 'previousButton' type='button' onClick={props.previousStep}>Previous Step</button>
      <button className = 'nextButton' type='button' onClick={filledRequired}>Next Step</button>
    </div>
  );
};

const CandidateDescription = (props) => {
  //function to make sure fields are filled in before proceeding
  const filledRequired = () => {
    if (props.userInput.referralText !== '') {
      props.nextStep();
    }
  };

  return (
    <div className = '.explain-container'>
      <label>
        Please briefly describe why you chose to refer this candidate:
        <textarea type='text' name='referralText' onChange={props.handleChange} />
      </label>
      <button className = 'previousButton' type='button' onClick={props.previousStep}>Previous Step</button>
      <button className = 'finishButton' onClick={filledRequired}>Finish</button>    
    </div>
  );
};

export default ReferralWizard;