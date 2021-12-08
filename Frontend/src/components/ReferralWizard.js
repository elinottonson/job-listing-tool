import StepWizard from 'react-step-wizard';
import React from 'react';
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
/*
  Sample Job Referral Object
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'johnsmith@gmail.com',
    referralText: 'Has many years of experience and...',
    listingId: 112
  }
*/

const ReferralWizard = ({ setOpenReferral, listingObj }) => {

  const [userInput, setUserInput] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    referralText: '',
    listingId: listingObj.id
  });
  const [errorMsg, setErrorMsg] = React.useState('');
  const [submittingForm, setSubmittingForm] = React.useState(false);
  const [wizardObj, setWizardObj] = React.useState({});

  // Called on every onChange event
  const handleChange = (event) => {
    const name = event.target.name.trim();
    const value = event.target.value.trim();
    setUserInput(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userInput.firstName !== '' && userInput.lastName !== ''
      && isValidEmail(userInput.email) && userInput.referralText !== '') {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      };

      console.log('Sending referral data...');
      setSubmittingForm(true);

      fetch('/api/new-referral', options)
        .then(async (res) => {
          console.log(res);
          console.log(res.status);
          if (!res.ok) {
            throw Error(await res.text());
          }
          return res.json();
        })
        .then(() => {
          wizardObj.lastStep();
          setSubmittingForm(false);
        })
        .catch((e) => {
          setErrorMsg(e.message);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='referral-form'>
      <p id='ref-wiz-title'>Leave a Referral</p>
      <StepWizard transitions='nothing' instance={(obj) => { setWizardObj(obj); }}>
        <CandidateName userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <ContactInfo userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <CandidateDescription
          userInput={userInput}
          setUserInput={setUserInput}
          handleChange={handleChange}
          errorMsg={errorMsg}
          submittingForm={submittingForm}
        />
        <SubmitPage setOpenReferral={setOpenReferral} />
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
    <div className='name-container'>
      <label>
        First Name<input type="text" name='firstName' onChange={props.handleChange} />
      </label>
      <label>
        Last Name<input type="text" name='lastName' onChange={props.handleChange} />
      </label>
      <button className='right-button' type='button' onClick={filledRequired}>Next Step</button>
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
    <div className='email-container'>
      <label>
        Email<input type='email' name='email' onChange={props.handleChange} />
      </label>
      <button className='left-button' type='button' onClick={props.previousStep}>Previous Step</button>
      <button className='right-button' type='button' onClick={filledRequired}>Next Step</button>
    </div>
  );
};

const CandidateDescription = (props) => {
  return (
    <div className='.explain-container'>
      <label>
        Please briefly describe why you chose to refer this candidate:
        <textarea type='text' name='referralText' onChange={props.handleChange} />
      </label>
      <p id='err-msg'>{props.errorMsg}</p>
      <button className='left-button' type='button' onClick={props.previousStep}>Previous Step</button>
      <button className='right-button'>{props.setSubmittingForm ? 'Submitting...' : 'Finish'}</button>
    </div>
  );
};

const SubmitPage = (props) => {
  const exitReferral = () => {
    props.setOpenReferral(false);
  };

  return (
    <div>
      <p>Thank you, your referral has been sucessfully submitted!</p>
      <button type='button' onClick={exitReferral}>Return to Listings</button>
    </div>
  );
};

export default ReferralWizard;