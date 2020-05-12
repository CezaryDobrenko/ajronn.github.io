import React from 'react'
import Note from './Note'
import DropBox from './DropBox'
import StickyNote from "../img/stickynote.png"
import Point from "../img/point.png"
import "../css/parkinglot.css"

const ParkingLot = (props) =>{


    const ournotes = props.notes.map((e,index) => {
        return(
            <Note changeTaskStatus={props.changeTaskStatus} changeNoteStatus={props.changeNoteStatus} checkUserLimit={props.checkUserLimit}
            changeColor={props.changeColor} color={e.color} removeNote={props.removeNote}
            changeProgress={props.changeProgress} index={index} key={e.id} item={e} reloadNotesState={props.reloadNotesState}/>
        )
    })

    return(
        <div className={props.slideMenuActive ? "menu unhide" : "menu"}>
            
            <div className={props.slideMenuActive ? "parkingtitle shake" : "parkingtitle"}>
                <p style={{fontFamily: "'Courgette', cursive",color: "rgb(255, 255, 77)", fontSize: "20px"}}><img src={Point} height="25"></img> Park the card <img src={StickyNote} height="20"></img></p>
            </div>
            <div style={{borderBottom: "3px solid rgb(255, 255, 77)", marginBottom: "20px"}}></div>
            <DropBox height="300px" columnid="parkinglot" notes={ournotes}/>




        </div>
    );


}

export default ParkingLot;