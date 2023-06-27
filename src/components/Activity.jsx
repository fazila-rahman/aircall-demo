import React from 'react'

function Activity(props) {   
    const { itemData } = props
    
    // Retrieve timestamp 
    const createdStamp = new Date(itemData.created_at)
    
    // Retrieve Time information
    var hours = createdStamp.getHours()
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours >= 12 ? (hours - 12) : hours
    var minutes = (createdStamp.getMinutes()).toString()
    if (minutes.length < 2) 
        minutes = "0" + minutes;

    // Determine call direction and source/destination of the call
    var fromOrTo = 'Nothing'
    var direction = 'ND'
    if (itemData.hasOwnProperty('direction')){
        fromOrTo = itemData.direction === 'inbound'? itemData.from : itemData.to
        direction = itemData.direction === 'inbound'? 'IN' : 'OUT'
        
        if( (itemData.direction ==='inbound') && (!itemData.hasOwnProperty('from')) ) 
                fromOrTo = itemData.via
        else if( (itemData.direction ==='outbound') && (!itemData.hasOwnProperty('to')) ) 
            fromOrTo = itemData.via     
    }
    else {
        if (itemData.hasOwnProperty('to')){
            direction = 'OUT'
            fromOrTo = itemData.to
        }
        else if (itemData.hasOwnProperty('from')){
                direction = 'IN'    
                fromOrTo = itemData.from
        }
    }

    //Determine call icon to be displayed
    var imagePath = "../images/outgoing-call-32.png" 
    if (direction === 'IN') {
        if (itemData.call_type === 'missed') {
            imagePath = "../images/missed-call-32.png" 
        }
        else if (itemData.call_type === 'answered') {
            imagePath = "../images/incoming-call-32.png" 
        }
        else if (itemData.call_type === 'voicemail') {
            imagePath = "../images/voice-32.png" 
        }
    }
    else if (direction === 'OUT') {
        if (itemData.call_type === 'missed') 
            imagePath = "../images/outgoing-missed-call-32.png" 
        else if (itemData.call_type === 'amswered') 
            imagePath = "../images/outgoing-received-call-32.png" 
    }
    
    // Return HTML
    return (
        <tr>
            <td><img className='archive-image' src={imagePath} alt='icon'/></td>  
            <td>{fromOrTo}</td>
            <td className='activity-table-time-data'><span className='dotted-left'>.</span><span>{hours}:{minutes}</span><span className='ampm'>{ampm}</span></td>  
        </tr>
        
    )
    
};

export default Activity;