import React from 'react'
import Draggable from "../dnd/draggable"
import Droppable from "../dnd/droppable"

export default class NoteField extends React.Component{

    state = {
        note: [
            {id: 'item1'}
        ]
    }

    notefieldStyle = {
        height: "100px",
        width: "100%",
        backgroundColor: "rgb(70,83,98)",
        position: "fixed",
        bottom: "0"
    }

    noteStyle = {
        height: "50px",
        width: "196px",
        backgroundColor: "rgb(70,50,98)",
        margin: "2px"
    }

    render(){
        const elements = this.state.note.map(e => {
            return <Draggable id={e.id} style={this.noteStyle}></Draggable>
        })

        return(
            <div style={this.notefieldStyle}>
                {elements}
            </div>
        )

    }

}