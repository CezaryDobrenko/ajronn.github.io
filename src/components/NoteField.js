import React from 'react'
import Draggable from "../dnd/draggable"
import Droppable from "../dnd/droppable"

export default class NoteField extends React.Component{

    constructor(props){
        super(props)
        
    }

    state = {
        toggle: false,
        idnumber: 0,
        id: 'item0',
        
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
        width: "190px",
        backgroundColor: "rgb(70,50,98)",
        margin: "5px"
    }

    addNoteToNoteField(){
        this.setState({idnumber: this.state.idnumber + 1})
        this.setState({id: "item"+this.state.idnumber})
        
        
    }

    render(){
        const element = <Draggable id={this.state.id} style={this.noteStyle} ></Draggable>

        return(
            <div className="notefield" style={this.notefieldStyle} onDragEnd={this.addNoteToNoteField.bind(this)}>
                {element}
            </div>
        )

    }

}