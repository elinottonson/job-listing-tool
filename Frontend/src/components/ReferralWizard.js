import StepWizard from 'react-step-wizard';
import React from 'react';
import { isValidEmail } from '../lib/Validation';

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
    listingId: listingObj.id
  });
  const [errorMsg, setErrorMsg] = React.useState({ error: false, msg: '' });
  const [submittingForm, setSubmittingForm] = React.useState(false);

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
        .then((data) => {
          //TODO: Add alert that referral was added succesfully
          console.log(data);
          setSubmittingForm(false);
          setOpenReferral(false);
        })
        .catch((e) => {
          setErrorMsg({ error: true, msg: e.message });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <StepWizard transitions='nothing'>
        <CandidateName userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <ContactInfo userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} />
        <CandidateDescription
          userInput={userInput}
          setUserInput={setUserInput}
          handleChange={handleChange}
          errorMsg={errorMsg}
          submittingForm={submittingForm}
        />
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
    <div>
      <label>
        First Name<input type="text" name='firstName' onChange={props.handleChange} />
      </label>
      <label>
        Last Name<input type="text" name='lastName' onChange={props.handleChange} />
      </label>
      <button type='button' onClick={filledRequired}>Next Step</button>
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
    <div>
      <label>
        Email<input type='email' name='email' onChange={props.handleChange} />
      </label>
      <button type='button' onClick={props.previousStep}>Previous Step</button>
      <button type='button' onClick={filledRequired}>Next Step</button>
    </div>
  );
};

const CandidateDescription = (props) => {
  return (
    <div>
      <label>
        Please briefly describe why you chose to refer this candidate:
        <textarea type='text' name='referralText' onChange={props.handleChange} />
      </label>
      <p id='err-msg'>{props.errorMsg.error ? props.errorMsg.msg : ''}</p>
      <button type='button' onClick={props.previousStep}>Previous Step</button>
      <button>{props.submittingForm ? 'Submitting...' : 'Finish'}</button>
    </div>
  );
};

export default ReferralWizard;