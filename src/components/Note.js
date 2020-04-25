import React from 'react'
import '../css/note.css'
import {useDrag} from 'react-dnd'
import { ItemTypes } from './Items'

const Note = props => {
  
    const[{isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.NOTE,
            id: props.item.id
        },
        
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    
    })

    return(
        <div className={"note"} ref={drag} id={props.item.id}>
            {props.item.id}
        </div>
    )
}

export default Note;