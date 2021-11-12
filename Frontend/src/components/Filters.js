import React from 'react';
import './../styles/Filters.css';
import 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select'

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const handleXp = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} Years`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };


  
  const Filters = ({ setFilterObj, filterObj }) => {
      
    const handleSal = props => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <SliderTooltip
          prefixCls="rc-slider-tooltip"
          overlay={`$${value}K`}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </SliderTooltip>
      );
    };

    const [tags, setTags] = React.useState(["SQL", "MySQL", "Angular", "NodeJS", "JavaScript", "Spark", "MongoDB"])

    function setFilter(minExperience, maxExperience, minSalary, maxSalary, tags) {
        const obj = {};
        obj.minExperience = minExperience ?? filterObj.minExperience;
        obj.minExperience = maxExperience ?? filterObj.maxExperience;
        obj.minSalary = minSalary ?? filterObj.minSalary;
        obj.maxSalary = maxSalary ?? filterObj.maxSalary;
        obj.tags = tags ?? filterObj.tags;
        console.log(obj);
        setFilterObj(obj);
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
                    // onChange={() => setFilter(0, 30, 0, 100, )}
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
                    handle={handleXp}
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
                    handle={handleSal}
                />
            </div>
        </div>
        </div>
    );
};

export default Filters;
