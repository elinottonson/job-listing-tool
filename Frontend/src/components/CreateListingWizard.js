import StepWizard from 'react-step-wizard';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';
import React from'react';
import './../styles/CreateListingWizard.css';
import { useHistory } from 'react-router';

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

const CreateListingWizard = ({ user, tags, setTags, setPopupOpen }) => {

  const [userInput, setUserInput] = React.useState({
    title: '',
    description: '',
    minYearsExperience: NaN,
    salary: NaN,
    tags: []
  });

  const history = useHistory();

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

    if(
      !userInput.title || !userInput.description || Number.isNaN(userInput.minYearsExperience) || 
      Number.isNaN(userInput.salary)
    ) {
      return;
    }
    else {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          listing: {
            title: userInput.title,
            description: userInput.description,
            minYearsExperience: Number(userInput.minYearsExperience),
            salary: Number(userInput.salary),
            tags: userInput.tags
          },
          user: user
        }),
      };

      console.log('Sending new listing request:');
      console.log(userInput);
      console.log(user);

      fetch('/api/new-listing', options)
        .then(res => {
          if(res.status === 200) {
            console.log('Successfully created new listing');
            history.goBack();
            setPopupOpen(false);
          }
          else {
            console.log('Error creating listing');
            console.log(res.status);
            return res.json();
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(e => { throw e; });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='wizard'> 
      <StepWizard
        className='stepwizard'
        nav={<Nav />} 
        transitions='nothing'
      >
        <JobTitle
          userInput={userInput} 
          handleChange={handleChange} 
        />
        <JobDescription
          userInput={userInput}  
          handleChange={handleChange} 
        />
        <Tags 
          tags={tags} 
          setTags={setTags} 
          userInput={userInput} 
          handleChange={handleChangeTags} 
          handleSubmit={handleSubmit}
        />
      </StepWizard>
    </form>
  );
};


const Nav = ({ totalSteps, currentStep }) => {

  const dots = [];
  for (let i = 1; i <= totalSteps; i++) {
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


const JobTitle = ({ nextStep, userInput, handleChange }) => {

  const [ err, setErr ] = React.useState(false);
  const [ experienceNaN, setExperienceNaN ] = React.useState(false);
  const [ salaryNaN, setSalaryNaN ] = React.useState(false);

  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (!userInput.title || !userInput.minYearsExperience || !userInput.salary || experienceNaN || salaryNaN) {
      setErr(true);
    }
    else {
      nextStep();
    }
  };

  const checkNumberReq = (event) => {
    const input = event.target.value;
    if(Number.isNaN(Number(input))) {
      return true;
    }
    else if(!input.length) {
      return false;
    }
    else {
      return false;
    }
  };

  // TODO: finish implementing react-tooltip
  return (
    <div  className='step-container'>
      <h1>Job Information</h1>
      <div className='input-container'>
        {err ? <p id='job-info-err-msg'>Please enter valid information.</p> : <></>}
        <label htmlFor='title'>Job Title *</label>
        <input 
          type="text" 
          placeholder="Title" 
          name='title' 
          onChange={(event) => {
            handleChange(event);
            setErr(false);
          }} 
          id={err ? 'invalid-text' : ''}
        />
        <label htmlFor='minYearsExperience'>Minimum Years of Experience *</label>
        <input 
          type="text" 
          placeholder="Years"
          name='minYearsExperience' 
          onChange={(event) => {
            setErr(false);
            setExperienceNaN(checkNumberReq(event));
            handleChange(event);
          }}
          id={experienceNaN || err ? 'invalid-text' : ''}
          //data-tip='custom show'
          //data-for='test-tt'
          //data-event='focus'
        />
        {/*<ReactTooltip id='test-tt' effect='solid' globalEventOff='click' getContent={() => 'test'}/>*/}
        <label htmlFor='salary'>Salary *</label>
        <input 
          type="text" 
          placeholder="Salary" 
          name='salary' 
          onChange={(event) => {
            setErr(false);
            setSalaryNaN(checkNumberReq(event));
            handleChange(event);
          }}
          id={salaryNaN || err ? 'invalid-text' : ''}
        />
        <p id='rf-text'>*Required Fields</p>
      </div>
      <div className='step-button-container'>
        <button type='button' onClick={filledRequired}>Next Step</button>
      </div>
    </div>
  );
};

const JobDescription = ({ nextStep, previousStep, userInput, handleChange }) => {

  const [ err, setErr ] = React.useState(false);

  //function to make sure required fields are filled in before proceeding
  const filledRequired = () => {
    if (userInput.description == '') {
      setErr(true);
    }
    else {
      nextStep();
    }
  };

  return (
    <div  className='step-container'>
      <h1>Job Description</h1>
      <div className='input-container'>
        {err ? <p id='job-info-err-msg'>Please add a description.</p> : <></>}
        <textarea className='jobdesc'  
          placeholder="Job Description" 
          rows='8'
          name='description' 
          onChange={(event) => {
            setErr(false);
            handleChange(event);
          }}
          id={err ? 'invalid-text' : ''}
        />
        <p id='rf-text'>*Required</p>
      </div>
      <div className='step-button-container step-two-buttons'>
        <button type='button' onClick={previousStep}>Previous Step</button>
        <button type='button' onClick={filledRequired}>Next Step</button>
      </div>
    </div>
  );
};


const Tags = ({ previousStep, handleChange, handleSubmit, tags, setTags }) => {

  const [addNewTag, setAddNewTag] = React.useState('');

  const addTag = (event)=> {
    setAddNewTag(event.target.value);
  };

  const handleAddNewTag = (event) => {
    event.preventDefault();
    if (addNewTag != '' && addNewTag in tags == false) {
      setTags(tags.concat(addNewTag));
    }
  };
  
  return (
    <div className='step-container'>
      <h1>Tags</h1>
      <div className='input-container'>
        <p id='inner-title'>Select tags to add to the listing:</p>
        <Select className='selectTag' 
          placeholder="Select Tags"
          isMulti={true} 
          options={tags.map(tag => { return {value: tag, label: tag}; })}
          maxMenuHeight={200}
          onChange={handleChange}
        />
        <p id='inner-title'>Or, create a new tag:</p>
        <div className='add-tag-container'>
          <input type='text' placeholder="New Tag" onChange={addTag} id='new-tag'/>
          <button id='add-tag-btn' onClick={handleAddNewTag}>Add Tag</button>
        </div>
      </div>
      <div className='step-button-container step-two-buttons'>
        <button type='button' onClick={previousStep}>Previous Step</button>
        <button onClick={handleSubmit}>Finish</button>
      </div>
    </div>
  );
};

export default CreateListingWizard;