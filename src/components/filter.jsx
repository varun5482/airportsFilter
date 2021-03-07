import React from 'react';
import './airport-styles.scss';

const Filter = (props) => {
    let {filterData,updateFilter} = props;
    const handleChange = (options={})=>{
        let {e,action} = options;
        let dummyFilter = {...filterData};
        let value = e.target.value;
        switch(action){
            case 'text':
                dummyFilter.searchTerm = value;
                break;
            case 'checkBox':
                if(e.target.checked){
                    dummyFilter.checkBox.push(value);
                }else{
                    let index = dummyFilter.checkBox.indexOf(value);
                    dummyFilter.checkBox.splice(index,1);
                }
                break;
            default:
                console.log("No case found");
        }  
        updateFilter(dummyFilter); 
    }

    return (
        <div className="filter-container">
            <div className="check-container">
                <div className="filter-title">Type</div>
                <div>
                    <span className="check-box-holder">
                        <input class="styled-checkbox" id="styled-checkbox-1" type="checkbox" value="small" onChange={(e)=>{handleChange({e,action:'checkBox'})}} />
                        <label for="styled-checkbox-1">Small</label>
                    </span>
                    <span className="check-box-holder">
                        <input class="styled-checkbox" id="styled-checkbox-2" type="checkbox" value="medium" onChange={(e)=>{handleChange({e,action:'checkBox'})}}/>
                        <label for="styled-checkbox-2">Medium</label>
                    </span>
                    <span className="check-box-holder">
                        <input class="styled-checkbox" id="styled-checkbox-3" type="checkbox" value="large" onChange={(e)=>{handleChange({e,action:'checkBox'})}}/>
                        <label for="styled-checkbox-3">Large</label>
                    </span>
                    <span className="check-box-holder">
                        <input class="styled-checkbox" id="styled-checkbox-4" type="checkbox" value="heliport" onChange={(e)=>{handleChange({e,action:'checkBox'})}}/>
                        <label for="styled-checkbox-4">Heliport</label>
                    </span>
                    <span className="check-box-holder">
                        <input class="styled-checkbox" id="styled-checkbox-5" type="checkbox" value="closed" onChange={(e)=>{handleChange({e,action:'checkBox'})}}/>
                        <label for="styled-checkbox-5">Closed</label>
                    </span>
                    <span className="check-box-holder">
                        <input class="styled-checkbox" id="styled-checkbox-6" type="checkbox" value="favourites" onChange={(e)=>{handleChange({e,action:'checkBox'})}}/>
                        <label for="styled-checkbox-6">In Your Favourites</label>
                    </span>
                </div>
            </div>
            <div className="search-container">
                <div className="filter-title">Filter by Search</div>
                <div>
                    <input className="search-text" value={filterData.searchTerm} onChange={(e)=>{handleChange({e,action:'text'})}}/>
                </div>
            </div>
        </div>
    )
}

export default Filter
