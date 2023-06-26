import React , { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from './Header.jsx';

//Format date
function FormatDate(data){
  const createdStamp = new Date(data +"T00:00:00")
  const date = createdStamp.toLocaleDateString('en-US',{
      day:   'numeric',
      month: 'short',
      year:  'numeric',

  });
  return date
}

//Group activities by date
function GroupByDate(data) {
  
  return data.reduce((acc, val) => {
    //console.log("-1:" + JSON.stringify(val))
    const date = val.created_at.match(/\d{4}-\d{2}-\d{2}/g).toString();
    //console.log("-2:" + date)
    const item = acc.find((item) => item.date.match(new RegExp(date, 'g')));
    //console.log("-3:" + JSON.stringify(item))
    if (!item) 
      acc.push({ date: date, activity_details: [val]});//acc.push({ date: date, activities: [val], heading: 'some heading' });
    else 
      item.activity_details.push(val);

    return acc;

  }, []);

}

const App = () => {

  const [activities, setData] = useState([])
  const [archiveFlag, setStatus] = useState(false)

  // Base Url from which the activities will be fetched
  const BASE_URL = 'https://cerulean-marlin-wig.cyclic.app/activities'

  // This will run one time after the component mounts
  useEffect(() => {
    //Fetch Data
    axios.get(BASE_URL)
      .then(function (response) {
        // handle success
        const activityData = response.data
          
        //Filter incomplete activity data by removing activities with zero duration
        const arrayJson = activityData.filter(activity=>activity.duration > 0)
        //Sort data by date in decending order
        let sortedData = arrayJson.sort((a, b) => { 
          let a1 = a.created_at.match(/\d{4}-\d{2}-\d{2}/g).toString() + " "+ a.created_at.match(/\d{2}:\d{2}:\d{2}/g).toString();
          let b1 = b.created_at.match(/\d{4}-\d{2}-\d{2}/g).toString() + " "+ b.created_at.match(/\d{2}:\d{2}:\d{2}/g).toString();
          
          return(new Date(b1).getTime() - new Date(a1).getTime())
      
        })
        console.log("Data Fetched from the server: "+ JSON.stringify(sortedData))
        
        if(!archiveFlag)
          setData(GroupByDate(sortedData))
        else setData([])
        
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
          
    });
    
    }, [archiveFlag]);
  
  
  return (
    <div className='container'>
      <Header/>
      <div className='archive-button-div'>
        <div>
          <img className='archive-image' src="../public/images/archive.png" />
        </div>      
        <button className='archive-button' onClick={() => {
          console.log("B1 - Archive status:"+archiveFlag)
          if(!archiveFlag)
            setData([])
          else setData(activities)
          setStatus(archiveFlag?false:true)  
          
          } }>{
            archiveFlag?"Unarchive all calls":"Archive all calls"
        }
          
      </button>
    </div>
      <div className="container-view">Some activities should be here</div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
