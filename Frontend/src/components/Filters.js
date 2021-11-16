import React from 'react';
import './../styles/Filters.css';
import 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select'

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

  
  const Filters = ({ setFilterObj, filterObj }) => {
    const [tags, setTags] = React.useState(["SQL", "MySQL", "Angular", "NodeJS", "JavaScript", "Spark", "MongoDB"])
    const [selectedValue, setSelectedValue] = React.useState([]);
    const [minSalary, setMinSalary] = React.useState(0);
    const [maxSalary, setMaxSalary] = React.useState(100);
    const [minExperience, setMinExperience] = React.useState(0);
    const [maxExperience, setMaxExperience] = React.useState(30);

    function setFilter(minExperience, maxExperience, minSalary, maxSalary, tags) {
        const obj = {};
        obj.minExperience = minExperience ?? filterObj.minExperience;
        obj.maxExperience = maxExperience ?? filterObj.maxExperience;
        obj.minSalary = minSalary ?? filterObj.minSalary;
        obj.maxSalary = maxSalary ?? filterObj.maxSalary;
        obj.tags = tags ?? filterObj.tags;
        console.log(obj);
        setFilterObj(obj);
    }

    function handleChangeSelect(value) {
      console.log(value[0])
      setSelectedValue(selectedValue => [...selectedValue, value[0].label]);
      console.log(selectedValue)
      filter();
    }

    const filter = () => {
      console.log('runs');
      setFilter(minExperience, maxExperience,  minSalary, maxSalary, selectedValue);
    }

    return (
    <div className='filter'>
        <div class="tags-container">
            <h3>Tags</h3>
            <div class="form">
                <Select className='selectTag' 
                    isMulti={true} 
                    options={tags.map(tag => {return {value: tag, label: tag}})}
                    maxMenuHeight={200}
                    value={tags.find(str => str === selectedValue)}
                    onChange={handleChangeSelect}
                />
            </div>
        </div>
        <div class="filter-container-ranges">
            <h3>Experience Level</h3>
            <div class="form">
                <Range 
                    allowCross={false} 
                    min={0} 
                    max={30} 
                    defaultValue={[0, 30]} 
                    // onChange={handleChangeRange()}
                />
            </div>
            <h3>Salary Range</h3>
            <div class="form">
                <Range 
                    allowCross={false} 
                    min={0} 
                    max={100} 
                    defaultValue={[0, 100]} 
                    step={10} 
                    // onChange={setFilter(minExperience, maxExperience,  minSalary, maxSalary, selectedValue)}
                />
            </div>
        </div>
        </div>
    );
};

export default Filters;
