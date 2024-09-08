import React from 'react'
import { CircularProgress } from "@mui/material";

const Loader:React.FC = () => {
    return (
        <div style={{marginLeft: '50%', marginRight: '50%'}}>
          <CircularProgress />
        </div>
      );

}

export default Loader