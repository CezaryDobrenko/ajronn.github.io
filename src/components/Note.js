import React,{useState,useEffect} from 'react'
import '../css/note.css'
import { ItemTypes } from './Items'
import {Draggable} from 'react-beautiful-dnd'
import Popup from 'reactjs-popup'
import avatar1 from '../avatars/avatar1.png'
import avatar2 from '../avatars/avatar2.png'
import avatar3 from '../avatars/avatar3.png'
import Progress from "./Progress";
import defaultAvatar from '../avatars/default.png'
const Note = (props) => {
    //let [avatar,setAvatar] = useState(props.item);  moze sie przyda na pozniej
    const handleClick=(name)=>{
        props.item.avatar = name;
        props.reloadNotesState()
    }
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
                    <Popup trigger={<button style={{visibility:"hidden"}}> <img id="default" src={props.item.avatar} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/></button>} position="right center">
                        <div>
                            <button onClick={()=>handleClick(avatar1)} style={{visibility:"hidden"}}> <img src={avatar1} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                            <button onClick={()=>handleClick(avatar2)} style={{visibility:"hidden"}}> <img src={avatar2} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                            <button onClick={()=>handleClick(avatar3)} style={{visibility:"hidden"}}> <img src={avatar3} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                        </div>
                    </Popup>
                    <Progress/>
                </div>
            )}
        </Draggable>
    )
}

export default Note;