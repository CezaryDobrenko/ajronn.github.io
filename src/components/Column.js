import React from 'react'
import Droppable from '../dnd/droppable'
import Draggable from '../dnd/draggable'
import '../css/column.css'
import Note from './Note.js'

class Column extends React.Component{
    

    state = {
        notes: []
    }

    dropStyle = {
        minHeight: "200px",
        paddingBottom: "50px"
    }

    addNote(){
        const item = { id: this.props.idnumber }
        const newElements = [...this.state.notes, item]
        this.setState({notes: newElements})
        this.props.incrementNoteIdNumber()
    }

    render(){
        const elements = this.state.notes.map(e => {
            return <div key = {e.id}><Draggable id={'item'+e.id} ><Note id={e.id}/></Draggable></div>
        })


       return (
           <div className={"column"}>
               <Droppable style={this.dropStyle} id={this.props.id} ><input style={{width: "70%", display: "block", marginLeft: "auto", marginRight: "auto"}} defaultValue={this.props.title}></input>
               {elements}
               
               </Droppable>
               <button onClick={this.addNote.bind(this)} style={{bottom: "0px", position: "relative",width: "calc(100% - 20px)", margin: "5px 10px"}}>Add note</button>
           </div>
       )
   }
}
    
export default Column;