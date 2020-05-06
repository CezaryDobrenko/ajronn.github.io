import React from 'react'
import '../css/note.css'
import {Draggable} from 'react-beautiful-dnd'
import Popup from 'reactjs-popup'
import Ricky from '../avatars/ricky.jpg'
import Julian from '../avatars/julian.jpeg'
import Bubbles from '../avatars/bubbles.jpg'
import Progressbar from './Progressbar'
import TextareaAutosize from 'react-textarea-autosize';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Trash from '../img/trash.png'

const Note = (props) => {
    //let [avatar,setAvatar] = useState(props.item);  moze sie przyda na pozniej

    
    const handleClick=(name)=>{
        props.item.avatar = name;
        props.reloadNotesState()
        props.checkUserLimit(name);
        
    }
    const handleText=(e)=>{
        props.item.contents = e.target.value;
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
        <div>
        <ContextMenuTrigger id={props.item.id}>
            <Draggable draggableId={props.item.id} index={props.index}>
                
                {(provided, snapshot) => (
                    
                    <div
                    className={`${props.color == "yellow" && "note y"} ${props.color == "blue" && "note b"} ${props.color == "green" && "note g"}`}
                        
                    
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                        
                        
                        <div style={{position: "absolute", top: "-20px",right: "-20px"}}>
                        <Popup contentStyle={{width: "auto"}} trigger={<button style={{visibility:"hidden"}}> <img id="default" src={props.item.avatar} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible", border: props.item.block ? "2px solid rgb(255, 77, 77)" : "" }}/></button>} position="right center" >
                            <div style={{textAlign: "center"}}>
                                Choose avatar<br/>
                                <button onClick={()=>handleClick(Ricky)} style={{visibility:"hidden"}}> <img src={Ricky} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                                <button onClick={()=>handleClick(Julian)} style={{visibility:"hidden"}}> <img src={Julian} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                                <button onClick={()=>handleClick(Bubbles)} style={{visibility:"hidden"}}> <img src={Bubbles} style={{borderRadius:50+"%", width:40,height:40,visibility:"visible"}}/>   </button>
                            </div>
                        </Popup>
                        </div>
                        
                        <div style={{margin: "5px", paddingTop: "10px"}}><TextareaAutosize onChange = {handleText} defaultValue={props.item.contents}/>
                        </div>
                    
                        
                        
                        <Progressbar progress={props.item.progress} changeProgress={changeProgress}/>
                        
                        
                    </div>
                    
                    
                )}
                
            </Draggable>
        </ContextMenuTrigger>
        <ContextMenu id={props.item.id} style={{zIndex: "10", width:"auto", height: "auto"}}>
            
            <MenuItem >
                <div onClick={() => props.removeNote(props.item, props.item.columnid)}><img src={Trash} height="25"/>Remove note</div>
            </MenuItem>

            <MenuItem >
                Change color
                <div>
                    
                    <div className="colorcircle y" onClick={() => props.changeColor(props.item.id,"yellow")}/>
                    <div className="colorcircle b" onClick={() => props.changeColor(props.item.id,"blue")}/>
                    <div className="colorcircle g" onClick={() => props.changeColor(props.item.id,"green")}/>
                </div>

            </MenuItem>

        </ContextMenu></div>
        
    )
}

export default Note;