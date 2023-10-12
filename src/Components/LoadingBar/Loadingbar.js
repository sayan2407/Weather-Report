import React from 'react';

import {CircularProgress} from '@mui/material'; 
import './loadingbar.css';

function Loadingbar() {
  return (
    <div className='loading_card'>
        <h3>Weather Report</h3>
        <CircularProgress color='success'/>
        <p class="loading_para">Fetching user location ...</p>
    </div>
  )
}

export default Loadingbar