import React from 'react'
import "../css/checklist.css"
import Checked from "../img/checked.png"

const Checklist = (props) => {



        const elements = props.tasks.map(e => {
            return (
            
            <div>
                <div className="checkbox" onClick={() => props.changeTaskStatus(e.id)}><img src={Checked} height="18" style={{display: e.checked ? "block" : "none"}}/></div>
                <div className="tasktext">
                    {e.contents}
                </div>
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
                </div>
            </div>
        )
    
}

export default Checklist