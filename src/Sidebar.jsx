import "./Sidebar.css"
import SubstationData from "../SubstationData.json";

export default function Sidebar({activeMarker}){
    let rec = [];
    for(let n = 0; n < SubstationData.records.length ; n++){
        if(activeMarker === SubstationData.records[n][0]){
            rec = SubstationData.records[n];             
        }
    }     
    
    return(
        <div id="sidebar" className="bg-gradient-to-r from-sky-500 to-indigo-500">
            <div className="heading">
                <div><img src="vidyut_logo.svg" alt="vidyut_logo"/></div>
                <div><h1 className="title">VIDYUT</h1></div> 
            </div> 
        {
            activeMarker === null ? null : 
            <div className="markerInfo">
                <p><b>{rec[1]} Substation</b></p>
                <p>Address: {rec[3]}</p>
                <p>Type: {rec[4]}</p>
            </div>
        }                 
        </div>
    )
};