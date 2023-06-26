import React from 'react'

function Spinner(props) {
  return (
    <div className="overlay">
        <div className="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  );
}

export default Spinner;