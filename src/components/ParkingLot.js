import React from 'react'
import Note from './Note'
import DropBox from './DropBox'
import StickyNote from "../img/stickynote.png"
import "../css/parkinglot.css"

const ParkingLot = (props) =>{


    const ournotes = props.notes.map((e,index) => {
        return(
            <Note changeNoteStatus={props.changeNoteStatus} checkUserLimit={props.checkUserLimit}
            changeColor={props.changeColor} color={e.color} removeNote={props.removeNote}
            changeProgress={props.changeProgress} index={index} key={e.id} item={e} reloadNotesState={props.reloadNotesState}/>
        )
    })

    return(
        <div className={props.slideMenuActive ? "menu unhide" : "menu"}>
            
            <div style={{textAlign: "center", borderBottom: "1px solid black", marginBottom: "20px"}}>
                <p><img src={StickyNote} height="20"></img> Park the card</p>
            </div>

            <DropBox height="300px" columnid="parkinglot" notes={ournotes}/>




        </div>
    );


}

export default ParkingLot;