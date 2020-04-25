import React from 'react'
import Droppable from '../dnd/droppable'
import Draggable from '../dnd/draggable'
import '../css/note.css'

class Note extends React.Component{
    

    render(){



       return (
        <div className="note">Note id: {this.props.id}</div>
       )
   }
}
    
export default Note;