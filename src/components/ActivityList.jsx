import React from 'react'
import Activity from './Activity.jsx';

function ActivityList(props) {   
    const { callList } = props
    // Return HTML
    return (
        <table className='activity-table-data'>
            <tbody>  
                {callList.map((activity, i) => ( 
                    <Activity key={i} className="activity-item" itemData={activity} />
                ))}
                             
            </tbody>
      </table>  
        
    )
    
};

export default ActivityList;