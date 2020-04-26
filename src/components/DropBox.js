import React from 'react'
import {ItemTypes} from './Items'
import {Droppable} from 'react-beautiful-dnd'

const DropBox = (props) => {

   
    return(
        
        <Droppable droppableId={props.columnid}>
            {(provided, snapshot) => (
                <div
                ref={provided.innerRef}
                style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',width: "100%", minHeight: "100px", paddingBottom: "50px" }}
                {...provided.droppableProps}
                >
                    {props.notes}
                    {provided.placeholder}
                </div>
            )}
   
        </Droppable>
    )
}

export default DropBox;