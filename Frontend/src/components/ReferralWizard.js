import StepWizard from 'react-step-wizard';
import React from'react';

const ReferralWizard = ({ setOpenReferral }) => {

  const [userInput, setUserInput] = React.useState({
    'first-name': '',
    'last-name': '',
    'email': '',
    'phone-number': '',
    'experience': '',
    'good-fit': ''
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
        <Name userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <ContactInfo userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <CandidateExperience userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <CandidateFit userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
      </StepWizard>
    </form>
  );
};

// TODO: disable next button when required inputs are not filled
const Name = (props) => {
  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (props.userInput['first-name'] !== '' && props.userInput['last-name'] !== '') {
      props.nextStep();
    }
  };

  return (
    <div>
      <label>
        First Name<input type="text" name='first-name' onChange={props.handleChange} />
      </label>
      <label>
        Last Name<input type="text" name='last-name' onChange={props.handleChange} />
      </label>
      <button type='button' onClick={filledRequired}>Next Step</button>
    </div>
  );
};

const ContactInfo = (props) => {
  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (props.userInput['email'] !== '' && props.userInput['phone-number'] !== '') {
      props.nextStep();
    }
  };

  return (
    <div>
      <label>
        Email<input type='email' name='email' onChange={props.handleChange} />
      </label>
      <label>
        Phone Number<input type='tel' name='phone-number' onChange={props.handleChange} />
      </label>
      <button type='button' onClick={props.previousStep}>Previous Step</button>
      <button type='button' onClick={filledRequired}>Next Step</button>
    </div>
  );
};

const CandidateExperience = (props) => {
  //function to make sure fields are filled in before proceeding
  const filledRequired = () => {
    if (props.userInput['experience'] !== '') {
      props.nextStep();
    }
  };

  return (
    <div>
      <label>
        Please Briefly Describe the candidate's experience (accomplishments):
        <textarea type='text' name='experience' onChange={props.handleChange} />
      </label>
      <button type='button' onClick={props.previousStep}>Previous Step</button>
      <button type='button' onClick={filledRequired}>Next Step</button>
    </div>
  );
};

const CandidateFit = (props) => {
  //function to make sure fields are filled in before proceeding
  const filledRequired = (event) => {
    if (props.userInput['good-fit'] === '') {
      event.preventDefault();
    }
  };

  return (
    <div>
      <label>
        Briefly describe why the candidate is a good fit for the company:
        <textarea type='text' name='good-fit' onChange={props.handleChange} />
      </label >
      <button type='button' onClick={props.previousStep}>Previous Step</button>
      <button onClick={filledRequired}>Finish</button>
    </div>
  );
};

export default ReferralWizard;