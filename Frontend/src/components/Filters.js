import React from 'react';
import './../styles/Filters.css';
import DoubleSlider from './DoubleSlider.js'


const Filters = () => {

    const [tags, setTags] = React.useState([])

    return (
    <div className='filter'>
        <div class="filter-container">
            <h3>Tags</h3>
            <div class="form">
                <label>
                    <input type="checkbox"/>Java
                </label>
                <label>
                    <input type="checkbox"/>Javascript
                </label>
                <label>
                    <input type="checkbox"/>NodeJS
                </label>
                {tags.map(tag => 
                <label>
                    <input type="checkbox"/>{tag}
                </label>)}
            </div>
        </div>
        <div class="filter-container">
            <h3>Experience Level</h3>
            <div class="form">
                <DoubleSlider/>
            </div>
        </div>
        <div>
            <h3>Salary Range</h3>
                <DoubleSlider/>
        </div>
    </div>
    );
};

export default Filters;
