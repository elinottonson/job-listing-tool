import StepWizard from 'react-step-wizard';
import React from 'react';
import { isValidEmail } from '../lib/Validation';
import './../styles/ReferralWizard.css';
import './../styles/CreateListingWizard.css';

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

const ReferralWizard = ({ handleClose, setOpenReferral, listingObj }) => {

  const [userInput, setUserInput] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    referralText: '',
    listingId: listingObj.id
  });
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
          throw e;
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='referral-form'>
      <hr/>
      <p id='ref-wiz-title'>Leave a Referral</p>
      <StepWizard 
        className='stepwizard'
        transitions='nothing' 
        instance={(obj) => { setWizardObj(obj); }}
        nav={<Nav />}
      >
        <CandidateName userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <ContactInfo userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <CandidateDescription
          userInput={userInput}
          setUserInput={setUserInput}
          handleChange={handleChange}
          submittingForm={submittingForm}
        />
        <SubmitPage setOpenReferral={setOpenReferral} handleClose={handleClose} />
      </StepWizard>
    </form>
  );
};

const Nav = ({ totalSteps, currentStep }) => {

  const dots = [];
  for (let i = 1; i < totalSteps; i++) {
    const isActive = currentStep === i;
    dots.push((
      <span
        key={`step-${i}`}
        className={`${'dot'} ${isActive ?  'active' : ''}`}
      >&bull;</span>
    ));
  }
  
  return (
    <div>{dots}</div>
  );
};

const CandidateName = (props) => {

  const [ err, setErr ] = React.useState(false);

  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (props.userInput.firstName !== '' && props.userInput.lastName !== '') {
      props.nextStep();
    }
    else {
      setErr(true);
    }
  };

  return (
    <div className='step-container'>
      <h1>Candidate Information</h1>
      <div className='input-container'>
        {err ? <p id='job-info-err-msg'>Please enter valid information.</p> : <></>}
        <label htmlFor='firstName'>First Name *</label>
        <input 
          classNametype="text" 
          name='firstName' 
          placeholder='First name' 
          onChange={props.handleChange} 
          id={err ? 'invalid-text' : ''}
        />
        <label htmlFor='lastName'>Last Name *</label>
        <input 
          type="text" 
          name='lastName' 
          placeholder='Last name' 
          onChange={props.handleChange} 
          id={err ? 'invalid-text' : ''}  
        />
        <p id='rf-text'>*Required Fields</p>
      </div>
      <div className='step-button-container'>
        <button type='button' onClick={filledRequired}>Next Step</button>
      </div>
    </div>
  );
};

const ContactInfo = (props) => {

  const [ err, setErr ] = React.useState(false);

  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (!isValidEmail(props.userInput.email)) {
      setErr(true);
    }
    else {
      props.nextStep();
    }
  };

  //Get contact info of referral -- used to contain phone number but our database currently doesn't handle that
  return (
    <div className='step-container'>
      <h1>Candidate Information</h1>
      <div className='input-container'>
        {err ? <p id='job-info-err-msg'>Please enter a valid email.</p> : <></>}
        <label htmlFor='email'>Email *</label>
        <input 
          type='email' 
          name='email' 
          onChange={props.handleChange} 
          id={err ? 'invalid-text' : ''}  
        />
        <p id='rf-text'>*Required Fields</p>
      </div>
      <div className='step-button-container step-two-buttons'>
        <button type='button' onClick={props.previousStep}>Previous Step</button>
        <button type='button' onClick={filledRequired}>Next Step</button>
      </div>
      
    </div>
  );
};

const CandidateDescription = (props) => {

  const [ err, setErr ] = React.useState(false);

  const filledRequired = () => {
    if (!props.userInput.referralText.length) {
      setErr(true);
    }
    else {
      props.nextStep();
    }
  };

  return (
    <div className='step-container'>
      <h1>Candidate Description</h1>
      <div className='input-container'>
        {err ? <p id='job-info-err-msg'>Please enter a description.</p> : <></>}
        <label htmlFor='referralText' id='ref-text-label'>
          Please briefly describe why you chose to refer this candidate: *
        </label>
        <textarea 
          type='text' 
          name='referralText' 
          placeholder='Description' 
          className='text-box' 
          onChange={props.handleChange}
          id={err ? 'invalid-text' : ''}
        />
        <p id='rf-text'>*Required Fields</p>
      </div>
      <div className='step-button-container step-two-buttons'>
        <button type='button' onClick={props.previousStep}>Previous Step</button>
        <button onClick={filledRequired}>{props.setSubmittingForm ? 'Submitting...' : 'Finish'}</button>
      </div>
    </div>
  );
};

const SubmitPage = (props) => {
  const exitReferral = () => {
    props.handleClose();
  };

  return (
    <div>
      <p id='thankyou-text'>Thank you, your referral has been sucessfully submitted!</p>
      <button type='button' onClick={exitReferral}>Return to Listings</button>
    </div>
  );
};

export default ReferralWizard;