import React from 'react';
import './../styles/Filters.css';
import 'rc-slider';
import 'rc-slider/assets/index.css';

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

const Filters = ({ setFilterObj, filterObj }) => {

    const [tags, setTags] = React.useState([])

    function setFilter(minExpreience, maxExpreience, minSalery, maxSalery, tags) {
        const obj = {};
        obj.minExpreience = minExpreience ?? filterObj.minExpreience;
        obj.minExpreience = maxExpreience ?? filterObj.maxExpreience;
        obj.minSalery = minSalery ?? filterObj.minSalery;
        obj.maxSalery = maxSalery ?? filterObj.maxSalery;
        obj.tags = tags ?? filterObj.tags;
        setFilterObj(obj);
    }

    return (
    <div className='filter'>
        <div class="filter-container">
            <h3>Tags</h3>
            <div class="form">
                {tags.map(tag => 
                <label>
                    <input type="checkbox"/>{tag}
                </label>)}
            </div>
        </div>
        <div class="filter-container-ranges">
            <h3>Experience Level</h3>
            <div class="form">
                <Range allowCross={false} min={0} max={30} defaultValue={[0, 30]} handle={handleXp}/>
            </div>
            <h3>Salary Range</h3>
            <div class="form">
                <Range allowCross={false} min={0} max={100000} defaultValue={[0, 100000]} step={10000} handle={handleSal}/>
            </div>
        </div>
        </div>
    );
};

export default Filters;
