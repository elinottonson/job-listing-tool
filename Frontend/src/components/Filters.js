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
      setFilter(null, null, null, null, value.map(x=>x.value))
    }

    function handleChangeRangeEx(value) {
      setFilter(value[0], value[1], null, null, null);
    }

    function handleChangeRangeSal(value) {
      setFilter(null, null, value[0], value[1], null);
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
                    onChange={handleChangeRangeEx}
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
                    onChange={handleChangeRangeSal}
                />
            </div>
        </div>
        </div>
    );
};

export default Filters;
