import React from 'react'

function ActivityList(props) {   
    const { callList } = props
    // Return HTML
    return (JSON.stringify(callList))
    
};

export default ActivityList;