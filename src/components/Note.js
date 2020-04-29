import React from 'react'
import '../css/note.css'
import {Draggable} from 'react-beautiful-dnd'
import Popup from 'reactjs-popup'
import avatar1 from '../avatars/avatar1.png'
import avatar2 from '../avatars/avatar2.png'
import avatar3 from '../avatars/avatar3.png'
import Progressbar from './Progressbar'

const Note = (props) => {
    //let [avatar,setAvatar] = useState(props.item);  moze sie przyda na pozniej
    const handleClick=(name)=>{
        props.item.avatar = name;
        props.reloadNotesState()
    }

    const changeProgress = (e) =>{

        var value = 0;

        if(e >= 0 && e<=100)
            value = e;
        
        if(e>100)
            value = 100;

        if(e == "")
            value = 0;
        props.changeProgress(props.item.id,value)
    }

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
                    <Popup contentStyle={{width: "auto"}} modal trigger={<button style={{visibility:"hidden"}}> <img id="default" src={props.item.avatar} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/></button>} position="right center" >
                        <div style={{textAlign: "center"}}>
                            Choose avatar<br/>
                            <button onClick={()=>handleClick(avatar1)} style={{visibility:"hidden"}}> <img src={avatar1} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                            <button onClick={()=>handleClick(avatar2)} style={{visibility:"hidden"}}> <img src={avatar2} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                            <button onClick={()=>handleClick(avatar3)} style={{visibility:"hidden"}}> <img src={avatar3} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                        </div>
                    </Popup>
                    </div>
                    <div className="removenotebutton" onClick={() => props.removeNote(props.item, props.item.columnid)}/>
                    <div style={{margin: "5px", paddingTop: "10px"}}><textarea defaultValue={props.item.contents}/></div>
                
                    
                    
                    <Progressbar progress={props.item.progress} changeProgress={changeProgress}/>
                    
                    
                </div>
                
            )}
            
        </Draggable>
        

        
    )
}

export default Note;