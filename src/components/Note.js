import React from 'react'
import '../css/note.css'
import { ItemTypes } from './Items'
import {Draggable} from 'react-beautiful-dnd'

const Note = props => {
  
    

    return(

        <Draggable  draggableId={props.item.id} index={0}>
            {(provided, snapshot) => (
                <div
                className={"note"}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                    {"Note id "+props.item.id}
                </div>
            )}
        </Draggable>
    )
}

export default Note;