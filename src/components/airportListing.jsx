import React,{useState,useEffect} from 'react'
import TableDisplay from './tableDisplay';
import airportData from './data/airports.json';
import Filter from './filter';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './airport-styles.scss';

const AirportListing = (props) => {
    const [currentData,updateCurrentData] = useState(airportData);
    const [currentFilteredResult,updateFilterResult] = useState(airportData);
    const [filterData,updateFilter] = useState({
        checkBox:[],
        searchTerm:''
    })
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const limit  = 4;
    const [pageData,updatePageData] = useState({
        curentPage: -1,
        dataLength : currentData.length,
    })

    useEffect(()=>{
        updatePageData({
            curentPage: 0,
            dataLength: currentFilteredResult.length,
        })
    },[])

    const handlePagination = (options = {}) => {
        let {action} = options;
        let dummyPageData = {...pageData};
        switch(action){
            case 'forward':
                dummyPageData.curentPage += limit;
                if(dummyPageData.curentPage > currentFilteredResult.length){
                    dummyPageData.curentPage -= limit;
                } 
                break;
            case 'back':
                dummyPageData.curentPage -= limit;
                if(dummyPageData.curentPage < 0){
                    dummyPageData.curentPage += limit;
                }
                break;
        }
        updatePageData(dummyPageData);
        let windowData = window.screen;
        if(windowData.width < 600){
            window.scrollTo({
                top: 0,
                behavior: 'smooth',});
        }
    }


    useEffect(()=>{
        let data = [];
        for(let index=pageData.curentPage;index<(pageData.curentPage + limit);index++){
            if(currentFilteredResult[index]){
                data.push(currentFilteredResult[index]);
            }
        }
        updateCurrentData(data);
    },[pageData,currentFilteredResult])

    useEffect(()=>{
        let filteredData= [];
        airportData.forEach((value) => {
            let add = false;
            if(filterData.checkBox.indexOf(value.type) !== -1){
                add = true;
            }
            if(filterData.searchTerm){
                let term = (filterData.searchTerm).toLocaleLowerCase();
                if((value.name && ((value.name).toLowerCase()).includes(term)) || (value.icao && ((value.icao).toLowerCase()).includes(term)) || (value.iata && ((value.iata).toLowerCase()).includes(term))){
                    add = true;
                }
                if(!isNaN(term) && (value.latitude === Number(term) || value.longitude === Number(term))){
                    add = true;
                }
            }
            if(add){
                filteredData.push(value);
            }
        })
        if(filterData.searchTerm === '' && filterData.checkBox.length === 0){
            filteredData = airportData;
        }
        updatePageData({
            curentPage: 0,
            dataLength: currentFilteredResult.length,
        })
        updateFilterResult(filteredData);
    },[filterData]);

    return (
        <div className={`filter-app ${isMobile ? 'mobile-app':'web-app'}`}>
            <div className="title-holder">
                <span className="bold-title">Filter</span>
                <span>airports</span>
            </div>
            <div className="options-filter-container">
                <Filter filterData={filterData} updateFilter={(data)=>{updateFilter(data)}} />
            </div>
            <div>
                <TableDisplay data={currentData}/>
            </div>
            <div className="page-info">
                <div className="arrow-icon" onClick={()=>{handlePagination({action:'back'})}}><ArrowBackIcon /></div>
                <div className="text-field">Showing <span className="bold-text">{pageData.curentPage + 1}</span> - <span className="bold-text">{(pageData.curentPage + limit) > currentFilteredResult.length ? currentFilteredResult.length : (pageData.curentPage + limit)}</span> of <span className="bold-text">{currentFilteredResult.length}</span></div>
                <div className="arrow-icon" onClick={()=>{handlePagination({action:'forward'})}}><ArrowForwardIcon/></div>
            </div>
        </div>
    )
}

export default AirportListing
