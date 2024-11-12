import React from 'react';
import {ThreeDots} from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';


const DataLoading:React.FC = () => {
     return (
        <div className="loading-style">
            <ThreeDots  color="#444444" height={50} width={50}/>
            
        </div>
    );
};

export default DataLoading;
