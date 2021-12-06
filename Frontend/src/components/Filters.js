import React from 'react';
import './../styles/Filters.css';
import 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select';

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Filters = ({ setFilterObj, filterObj, tags }) => {

  // TODO: JSdoc entry for setFilter()
  function setFilter(minExperience, maxExperience, minSalary, maxSalary, newTags) {
    const obj = {};
    obj.minExperience = minExperience ?? filterObj.minExperience;
    obj.maxExperience = maxExperience ?? filterObj.maxExperience;
    obj.minSalary = minSalary ?? filterObj.minSalary;
    obj.maxSalary = maxSalary ?? filterObj.maxSalary;
    obj.tags = newTags ?? filterObj.tags;
    setFilterObj(obj);
    console.log(filterObj);
  }

  // TODO: JSdoc entry for handleChangeSelect()
  function handleChangeSelect(value) {
    setFilter(null, null, null, null, value.map(x=>x.value));
  }

  return (
    <div className='filter'>
      <div className="tags-container">
        <p id='tags-label'>Tags</p>
        <div class="form">
          <Select className='select-tag-container' classNamePrefix='select-tag' 
            isMulti={true} 
            options={tags.map(tag => { return {value: tag, label: tag}; })}
            maxMenuHeight={200}
            onChange={handleChangeSelect}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral50: 'black',
              },
            })}
            aria-label='select tags to filter by'
          />
        </div>
      </div>
      <div class="filter-container-ranges">
        <p>Experience Level</p>
        <div className="form">
          <Range 
            allowCross={false} 
            min={0} 
            max={30} 
            defaultValue={[0, 30]} 
            onAfterChange={(x)=>setFilter(x[0],x[1],null,null,null)}
          />
        </div>
        <p>Salary Range</p>
        <div className="form">
          <Range 
            allowCross={false} 
            min={0} 
            max={250000} 
            defaultValue={[0, 250000]} 
            step={10000} 
            onAfterChange={(x)=>setFilter(null,null,x[0],x[1],null)}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
