import React from 'react'

const tableDisplay = (props) => {
    let {data} = props;
    let tabularData = data.map((item,key) => {
        return <tr key={item.id}>
            <td>{item.name || '-'}</td>
            <td>{item.icao || '-'}</td>
            <td>{item.iata || '-'}</td>
            <td>{item.elevation || '-'} ft</td>
            <td>{(item.latitude).toFixed(2) || '-'}</td>
            <td>{(item.longitude).toFixed(2)|| '-'}</td>
            <td>{item.type}</td>
        </tr>
    })
    return (
        <div className="tablular-data">
            <table>
                <thead>
                    <tr className="left-align heading-tab">
                        <th>Name</th>
                        <th>ICAO</th>
                        <th>IATA</th>
                        <th>Elev.</th>
                        <th>Lat.</th>
                        <th>Long.</th>
                        <th>Type</th>
                    </tr>    
                </thead>
                {tabularData}
            </table>
        </div>
    )
}

export default tableDisplay
