import StepWizard from "react-step-wizard";

const ReferralWizard = ({setOpenReferral}) => {

  const handleSubmit = (event) => {
      event.preventDefault();
      setOpenReferral(false);

      let formObj = {
        firstName: event.target['first-name'].value,
        lastName: event.target['first-name'].value,
        email: event.target['email'].value,
      }
      console.log(formObj);
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepWizard transitions ='nothing'>
        <Name />
        <ContactInfo />
        <CandidateExperience />
        <CandidateFit />
    </StepWizard>
    </form>
  );
}

// TODO: disable next button when required inputs are not filled
const Name = (props) => {
  return (
  <div> 
    <label>
        First Name<input type="text" name='first-name'/>
    </label>
    <label>
        Last Name<input type="text" name='last-name'/>
    </label>
    <button type='button' onClick={props.nextStep}>Next Step</button>
</div>
);
}

const ContactInfo = (props) => {
  return (
<div>
  <label>
  Email<input  type="text" name='email'/>
  </label>
  <label>
  Phone Number<input type="tel" name='phone-number'/>
  </label>
  <button type='button' onClick={props.previousStep}>Previous Step</button>
  <button type='button' onClick={props.nextStep}>Next Step</button>
</div>
  );
}

const CandidateExperience = (props) => {
  return (
    <div>
    <label>
    Please Briefly Describe the candidate's experience (accomplishments):
      <textarea type='text' name='experience'/>
    </label>
    <button type='button' onClick={props.previousStep}>Previous Step</button>
    <button type='button' onClick={props.nextStep}>Next Step</button>
  </div> 
  );
}

const CandidateFit = (props) => {
  return (
<div>
  <label>
  Briefly describe why the candidate is a good fit for the company:
    <textarea type='text' name='fit'/>
  </label >
  <button type ='button' onClick={props.previousStep}>Previous Step</button>
    <button>Finish</button>
</div>   
  );
}

export default ReferralWizard;