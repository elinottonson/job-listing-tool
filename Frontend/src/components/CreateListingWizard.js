import StepWizard from 'react-step-wizard';
import Select from 'react-select';
import React from'react';
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

const CreateListingWizard = ({ setOpenCreateListing, tags, setTags, createListing}) => {

  const [userInput, setUserInput] = React.useState({
    jobTitle: '',
    description: '',
    minYearsExperience: '',
    salary: '',
    tags: []
  });

  const [showErr, setShowErr] = React.useState(false);
  const [showErrFill, setShowErrFill] = React.useState(false);

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
    setOpenCreateListing(false);
  };

  return (
    <form onSubmit={handleSubmit} className='wizard'> 
      <StepWizard 
        nav={<Nav 
          userInput={userInput} 
          showErr={showErr}
          setShowErr={setShowErr}/>} 
        transitions='nothing'>

        <JobTitle 
          showErr={showErr}
          setShowErr={setShowErr}
          showErrFill={showErrFill}
          setShowErrFill={setShowErrFill}
          userInput={userInput} 
          setUserInput={setUserInput} 
          handleChange={handleChange} />
        <JobDescription
          showErr={showErr}
          setShowErr={setShowErr}
          showErrFill={showErrFill}
          setShowErrFill={setShowErrFill}
          userInput={userInput} 
          setUserInput={setUserInput} 
          handleChange={handleChange} />
        <Tags 
          tags={tags} 
          setTags={setTags} 
          createListing={createListing}
          setOpenCreateListing={setOpenCreateListing}
          userInput={userInput} 
          setUserInput={setUserInput} 
          handleChange={handleChangeTags} />
      </StepWizard>
    </form>
  );
};


const Nav = (props) => {

  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
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

// TODO: display error message when conditions for moving to the next step have not been met
const JobTitle = (props) => {

  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (props.userInput.jobTitle == '' || props.userInput.minYearsExperience == '' || props.userInput.salary == '') {
      props.setShowErr(true);
    }
    else {
      props.nextStep();
    }
  };

  return (
    <div  className='step-container'>
      <h1>Job Information</h1>
      {props.showErr ? <p className="field-error">*Required Fields</p> : <p>*Required Fields</p>}
      <div className='input-container'>
        <input type="text" placeholder="Job Title" name='jobTitle' onChange={props.handleChange} />
        <input 
          type="number" 
          placeholder="Minimum Years of Experience Required" 
          name='minYearsExperience' 
          onChange={props.handleChange} />
        <input type="number" placeholder="Salary" name='salary' onChange={props.handleChange}/>
      </div>
      <button type='button' onClick={filledRequired}>Next Step</button>
    </div>
  );
};

const JobDescription = (props) => {

  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (props.userInput.description == '') {
      props.setFieldError(true);
    }
    else {
      props.nextStep();
    }
  };

  return (
    <div  className='step-container'>
      <h1>Job Description</h1>
      <div className='input-container'>
        <textarea className='jobdesc'  
          placeholder="Job Description" 
          rows='8'
          name='description' 
          onChange={props.handleChange} />
        {props.fieldError ? <p className="field-error">*Required</p> : <p>*Required</p>}
      </div>
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
      <h1>Tags</h1>
      <p>Please select any tags you wish to add to the listing:</p>
      <div className='input-container'>
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
      </div>
      <button type='button' onClick={props.previousStep}>Previous Step</button>
      <button >Finish</button>    
    </div>
  );
};

export default CreateListingWizard;