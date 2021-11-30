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
    salary: '',
    tags: []
  });

  // Called on every onChange event
  const handleChange = (event) => {
    const name = event.target.name.trim();
    const value = event.target.value.trim();
    setUserInput(values => {
      return ({ ...values, [name]: value });
    });
  };

  const handleChangeTags = (value) => {
    setUserInput(values => {
      return ({ ...values, 'tags': value.map(obj => obj.value)});
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenReferral(false);
    console.log(userInput);

  };

  return (
    <form onSubmit={handleSubmit} className='wizard'> 
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
          setOpenReferral={setOpenReferral}
          userInput={userInput} 
          setUserInput={setUserInput} 
          handleChange={handleChangeTags} />
      </StepWizard>
    </form>
  );
};

// TODO: display error message when conditions for moving to the next step have not been met
const JobTitle = (props) => {
  //function to make sure required fields are filled in before proceeding

  return (
    <div  className='step-container'>
      <input type="text" placeholder="Job Title" name='jobTitle' onChange={props.handleChange} />
      <input 
        type="text" 
        placeholder="Minimum Years of Experience Required" 
        name='minYearsExperience' 
        onChange={props.handleChange} />
      <input type="text" placeholder="Salary" name='salary' onChange={props.handleChange}/>
      <button type='button' onClick={props.nextStep}>Next Step</button>
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
    <div  className='step-container'>
      <textarea className='jobdesc'  
        placeholder="Job Description" 
        rows='8'
        name='description' 
        onChange={props.handleChange} />
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

  const handleAddNewTag = (event) => {
    event.preventDefault();
    if (addNewTag != '' && addNewTag in props.tags == false) {
      props.setTags(props.tags.concat(addNewTag));
    }
  };
  
  return (
    <div className='step-container'>
      <Select className='selectTag' 
        placeholder="Select Tags"
        isMulti={true} 
        options={props.tags.map(tag => { return {value: tag, label: tag}; })}
        maxMenuHeight={200}
        onChange={props.handleChange}
      />
      <div>
        <input type='text' placeholder="Or, Create a New Tag" onChange={addTag}/>
        <button onClick={handleAddNewTag}>Add New Tag</button>
      </div>
      <button type='button' onClick={props.previousStep}>Previous Step</button>
      <button >Finish</button>    
    </div>
  );
};

export default CreateReferralWizard;