import React from 'react';
import './../styles/Filters.css';
import 'rc-slider';
import 'rc-slider/assets/index.css';

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

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
        <div className='filter' onClick={()=>setFilter(null,null,null,null,['SQL'])}>
            <div class="filter-container">
                <h3>Tags</h3>
                <div class="form">
                    <label>
                        <input type="checkbox" onAuxClick={()=>setFilter(null,null,100000,null,null)}/>Java
                    </label>
                    <label>
                        <input type="checkbox" />Javascript
                    </label>
                    <label>
                        <input type="checkbox" />NodeJS
                    </label>
                    {tags.map(tag =>
                        <label>
                            <input type="checkbox" />{tag}
                        </label>)}
                </div>
            </div>
            <div class="filter-container-ranges">
                <h3>Experience Level</h3>
                <div class="form">
                    <Range allowCross={false} min={0} max={30} defaultValue={[0, 30]} ariaValueTextFormatterGroupForHandles={[(value) => "$" + value + " per year"]} />
                </div>
                <h3>Salary Range</h3>
                <div class="form">
                    <Range allowCross={false} min={0} max={100000} defaultValue={[0, 100000]} step={1000} />
                </div>
            </div>
        </div>
    );
};

export default Filters;
