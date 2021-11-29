import StepWizard from 'react-step-wizard';
import Select from 'react-select';
import React from'react';
import './../styles/CreateReferralWizard.css';

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

const CreateReferralWizard = ({ setOpenReferral, tags, setTags, createReferral }) => {

  const [userInput, setUserInput] = React.useState({
    jobTitle: '',
    description: '',
    minYearsExperience: '',
    salary: ''
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
        <JobTitle 
          userInput={userInput} 
          setUserInput={setUserInput} 
          handleChange={handleChange} />
        <JobDescription
          userInput={userInput} 
          setUserInput={setUserInput} 
          handleChange={handleChange} />
        <Tags 
          tags={tags} 
          setTags={setTags} 
          createReferral={createReferral}
          userInput={userInput} 
          setUserInput={setUserInput} 
          handleChange={handleChange} />
      </StepWizard>
    </form>
  );
};

// TODO: display error message when conditions for moving to the next step have not been met
const JobTitle = (props) => {
  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (props.userInput.firstName !== '' && props.userInput.lastName !== '') {
      props.nextStep();
    }
  };

  return (
    <div className='wizard'>
      <label className='jobtitle'>
        Job Title<input type="text" name='jobtitle' onChange={props.handleChange} />
      </label>
      <label>
        Minimum Years of Experience Required
        <input type="text" name='minYearsExperience' onChange={props.handleChange} />
      </label>
      <label>
        Salary <input type="text" name='salary' onChange={props.handleChange}/>
      </label>
      <button type='button' onClick={filledRequired}>Next Step</button>
    </div>
  );
};

const JobDescription = (props) => {
  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    props.nextStep();
  };

  //Get contact info of referral -- used to contain phone number but our database currently doesn't handle that
  return (
    <div>
      <label>
        Job Description<input type='textarea' name='description' onChange={props.handleChange} />
      </label>
      <button type='button' onClick={props.previousStep}>Previous Step</button>
      <button type='button' onClick={filledRequired}>Next Step</button>
    </div>
  );
};


const Tags = (props) => {

  const [addNewTag, setAddNewTag] = React.useState('');

  const addTag = (event)=> {
    setAddNewTag(event.target.value);
  };
  
  return (
    <div>
      <Select className='selectTag' 
        isMulti={true} 
        options={props.tags.map(tag => { return {value: tag, label: tag}; })}
        maxMenuHeight={200}
      />
      <div>
        <label>
          Or, Create a new Tag:<input type='text' name='tags' onChange={addTag}/>
        </label>
        <button onClick={() => {props.setTags(props.tags.concat(addNewTag));}}>Add New Tag</button>
      </div>
      <button type='button' onClick={props.previousStep}>Previous Step</button>
      <button onClick={props.nextStep}>Finish</button>    
    </div>
  );
};

export default CreateReferralWizard;