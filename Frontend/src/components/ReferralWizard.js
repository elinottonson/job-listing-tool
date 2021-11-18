import { FaWizardsOfTheCoast } from "react-icons/fa";
import StepWizard from "react-step-wizard";

const ReferralWizard = () => {
  return (
    <StepWizard transitions ='nothing'>
      <Name />
      <ContactInfo />
      <CandidateExperience />
      <CandidateFit />
    </StepWizard>
  );
}
const Name = (props) => {
  return (
  <div> 
    <label>
        First Name<input type="text"/>
    </label>
    <label>
        Last Name<input type="text"/>
    </label>
    <button onClick={props.nextStep}>Next Step</button>
</div>
);
}

const ContactInfo = (props) => {
  return (
<div>
  <label>
  Email<input type="text"/>
  </label>
  <label>
  Phone Number<input type="text"/>
  </label>
  <button onClick={props.previousStep}>Previous Step</button>
  <button onClick={props.nextStep}>Next Step</button>
</div>
  );
}

const CandidateExperience = (props) => {
  return (
    <div>
    <label>
    Please Briefly Describe the experience of the candidate:
      <textarea/>
    </label>
    <button onClick={props.previousStep}>Previous Step</button>
    <button onClick={props.nextStep}>Next Step</button>
  </div> 
  );
}

const CandidateFit = (props) => {
  return (
<div>
  <label>
  Briefly describe why you think they would be a good fit for this position:
    <textarea type="text"/>
  </label >
  <button onClick={props.previousStep}>Previous Step</button>
    <button>Finish</button>
</div>   
  );
}

export default ReferralWizard;