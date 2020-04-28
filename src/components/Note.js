import React from 'react'
import '../css/note.css'
import {Draggable} from 'react-beautiful-dnd'
import Popup from 'reactjs-popup'
import avatar1 from '../avatars/avatar1.png'
import avatar2 from '../avatars/avatar2.png'
import avatar3 from '../avatars/avatar3.png'

const Note = (props) => {
    //let [avatar,setAvatar] = useState(props.item);  moze sie przyda na pozniej
    const handleClick=(name)=>{
        props.item.avatar = name;
        props.reloadNotesState()
    }

    const [progress, setProgress] = React.useState("0%")

    return(
        
        <Draggable  draggableId={props.item.id} index={props.index}>
            {(provided, snapshot) => (
                <div
                className={"note"}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                    

                    <div style={{position: "absolute", top: "-20px",right: "-20px"}}>
                    <Popup trigger={<button style={{visibility:"hidden"}}> <img id="default" src={props.item.avatar} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/></button>} position="right center">
                        <div>
                            <button onClick={()=>handleClick(avatar1)} style={{visibility:"hidden"}}> <img src={avatar1} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                            <button onClick={()=>handleClick(avatar2)} style={{visibility:"hidden"}}> <img src={avatar2} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                            <button onClick={()=>handleClick(avatar3)} style={{visibility:"hidden"}}> <img src={avatar3} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                        </div>
                    </Popup>
                    </div>
                    <div style={{margin: "5px", paddingTop: "10px"}}><textarea defaultValue={props.item.contents}/></div>
                    
                    <input type="text" onChange={event => setProgress(event.target.value+"%")}/>
                    <div style={{width: "100%", height: "10px", backgroundColor: "grey"}}>
                        <div style={{width: progress, height: "10px", backgroundColor: "lightblue", borderRadius: "5px"}}/>
                    </div>
                    
                    
                </div>
                
            )}
            
        </Draggable>
    )
}

export default Note;