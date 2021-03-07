import React,{useState,useEffect} from 'react'
import TableDisplay from './tableDisplay';
import airportData from './data/airports.json';
import Filter from './filter';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './airport-styles.scss';

const AirportListing = (props) => {
    let sessionStorage = window.sessionStorage;
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
        let key = '';
        let isCached = false;
        if(filterData.checkBox.length){
            filterData.checkBox.forEach(value => {
                key += value;
            })
        }
        if(filterData.searchTerm){
            key += filterData.searchTerm;
        }

        //Caching Implemented using Session Storage
        if(sessionStorage.getItem(key)){
            isCached = true;
            filteredData = JSON.parse(sessionStorage.getItem(key));
        }else if(filterData.searchTerm === '' && filterData.checkBox.length === 0){
            filteredData = airportData;
        }else{
            airportData.forEach((value) => {
                let add = false;
                let termMatch = false;
                if(filterData.checkBox.indexOf(value.type) !== -1){
                    add = true;
                }else if(filterData.checkBox.length == 0){
                    add = true;
                }
                if(filterData.searchTerm){
                    let term = (filterData.searchTerm).toLocaleLowerCase();
                    if((value.name && ((value.name).toLowerCase()).includes(term)) || (value.icao && ((value.icao).toLowerCase()).includes(term)) || (value.iata && ((value.iata).toLowerCase()).includes(term))){
                        termMatch = true;
                    }
                    if(!isNaN(term) && (value.latitude === Number(term) || value.longitude === Number(term))){
                        termMatch = true;
                    }
                }else{
                    termMatch = true;
                }
                if(add && termMatch){
                    filteredData.push(value);
                }
            })
        }
       
        if(!isCached){
            let dataToStore = [...filteredData];
            dataToStore = JSON.stringify(dataToStore);
            sessionStorage.setItem(key,dataToStore);
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
                <div className="text-field">Showing <span className="bold-text">{currentFilteredResult.length == 0 ? 0 : pageData.curentPage + 1}</span> - <span className="bold-text">{(pageData.curentPage + limit) > currentFilteredResult.length ? currentFilteredResult.length : (pageData.curentPage + limit)}</span> of <span className="bold-text">{currentFilteredResult.length}</span></div>
                <div className="arrow-icon" onClick={()=>{handlePagination({action:'forward'})}}><ArrowForwardIcon/></div>
            </div>
        </div>
    )
}

export default AirportListing
