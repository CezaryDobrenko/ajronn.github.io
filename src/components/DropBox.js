import React from 'react'
import {useDrop} from 'react-dnd'
import {ItemTypes} from './Items'

const DropBox = props => {

    const[{isOver}, drop] = useDrop({
        accept: ItemTypes.NOTE,
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            drop: (
                props.setColumnidTo(props.columnid, monitor.getItem())
                /*props.moveNote(monitor.getItem())*/
            )
        })
    })

    return(
        <div ref={drop} style={{width: "100%", minHeight: "100px", paddingBottom: "50px"}}>
                {props.notes}
        </div>
    )
}

export default DropBox;