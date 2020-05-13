import React from 'react'
import "../css/checklist.css"
import Checked from "../img/checked.png"
import TextareaAutosize from 'react-textarea-autosize';

const Checklist = (props) => {

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          props.addTask(props.id, e.target.value)
          e.target.value = ""
        }
      }


        const elements = props.tasks.map(e => {
            return (
            
            <div>
                <div className="checkbox" onClick={() => props.changeTaskStatus(e.id)}><img src={Checked} height="18" style={{display: e.checked ? "block" : "none"}}/></div>
                <div className="tasktext"><TextareaAutosize defaultValue={e.contents} style={{width: "350px"}}></TextareaAutosize></div>
                <div className="removetask" onClick={() => props.removeTask(e.noteid,e)}></div>
                <div className="underline"></div>
            </div>

                
            )
        })

        return(
            <div className="modal" style={{display: props.isOpen ? "block" : "none"}}>
                
                <div className= "checklist">
                <div className="checklistheader"></div>
                <div className="closechecklist" onClick={() => props.closeModal()}></div>
                    {elements}
                    <input placeholder="Add task" style={{width: "75%", margin: "0 auto", display: "block", color: "black"}}
                    onKeyDown={_handleKeyDown}></input>
                </div>
            </div>
        )
    
}

export default Checklist