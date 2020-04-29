import Popup from 'reactjs-popup'
import React from 'react'

const Progressbar = (props) => {


    return(
        <Popup contentStyle={{width: "auto"}} modal trigger={
            <div style={{width: "100%", height: "10px", backgroundColor: "grey", textAlign: "center"}}>
                <div style={{width: props.progress+"%", height: "10px", backgroundImage: "linear-gradient(to right, rgb(26, 178, 255), lightblue)", borderRadius: "5px"}}></div>
            </div>
        }>
            Change value of progress<br/>
            <input placeholder="%" style={{width: "30px", marginLeft: "auto", marginRight: "auto", display: "block"}} maxLength="3" type="text" onChange={(event) => props.changeProgress(event.target.value)}/>
        </Popup>
    );




}

export default Progressbar;