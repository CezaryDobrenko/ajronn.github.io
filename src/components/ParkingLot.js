import React from 'react'
import Note from './Note'
import DropBox from './DropBox'
import StickyNote from "../img/stickynote.png"

const ParkingLot = (props) =>{


    const ournotes = props.notes.map((e,index) => {
        return(
            <Note changeNoteStatus={props.changeNoteStatus} checkUserLimit={props.checkUserLimit}
            changeColor={props.changeColor} color={e.color} removeNote={props.removeNote}
            changeProgress={props.changeProgress} index={index} key={e.id} item={e} reloadNotesState={props.reloadNotesState}/>
        )
    })

    return(
        <div style={{marginTop: "100px" ,height: "auto", display: props.slideMenuActive ? "block" : "none",
            width: "198px", float: "left", position: "flex", border: "1px solid black",
            borderLeft: "none", borderRadius: "0 10px 10px 0"}}>
            
            <div style={{textAlign: "center", borderBottom: "1px solid black", marginBottom: "20px"}}>
                <p><img src={StickyNote} height="20"></img> Park the card</p>
            </div>

            <DropBox height="500px" columnid="parkinglot" notes={ournotes}/>




        </div>
    );


}

export default ParkingLot;