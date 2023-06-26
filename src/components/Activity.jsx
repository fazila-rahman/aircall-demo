import React from 'react'

function Activity(props) {   
    const { itemData } = props
    console.log(JSON.stringify(itemData))
    
    // Return HTML
    return (
        <tr>
            <td>Icon </td>  
            <td>Number</td>
            <td> Time </td>  
        </tr>
        
    )
    
};

export default Activity;