import React from 'react'
import Collapsible from 'react-collapsible'
import Popup from "reactjs-popup"
import AddColumnInput from "./AddColumnInput"
import '../css/swimlane.css'
import Column from './Column.js'
import SwimlaneIcon from '../img/swimlaneminus.png'

class Swimlane extends React.Component{   
    
    render(){
        const elements = this.props.columns
        .filter((e) => e.swimlaneid === this.props.element.id)
        .map((e,index) => {
            return(
                <div key = {e.id}>
                    <Column changeNoteStatus={this.props.changeNoteStatus} checkUserLimit={this.props.checkUserLimit} changeColor={this.props.changeColor} changeColumnInfo={this.props.changeColumnInfo} changeColumnWIPLimit={this.props.changeColumnWIPLimit} removeNote={this.props.removeNote} removeColumn={this.props.removeColumn} changeProgress={this.props.changeProgress} changeColumnTitle={this.props.changeColumnTitle} element={e} index={index} title={e.title} addNote={this.props.addNote} reloadNotesState={this.props.reloadNotesState}/>
                </div>
            )
        })

       return (
           <div style={{backroundColor:"#7BAEFF"}}>
            <Collapsible open triggerStyle={{backgroundColor: "rgb(70,83,98)", height: "50px"}}>
                <div style={{width: "100%", height: "100%"}}>
                
                    <div className="steericon" onClick={() => this.props.removeSwimlane(this.props.element)}><img src={SwimlaneIcon} height="30"/></div>
                    <input type="text" style={{all:"initial",width: "200px",marginLeft:"40%",backgroundColor:"white",textAlign:"center",border:"2px solid #6EF2FF",borderRadius:"10px",height:"30px",fontFamily: "'Comic Neue', cursive",marginBottom:"10px"}} defaultValue={this.props.element.title} onChange={(event) => this.props.changeSwimlaneTitle(this.props.element, event.target.value)} /></div>
                        <div className="columnfield">

                            {elements}
                            <div className="addcolumnfield">
                                <AddColumnInput addColumn={this.props.addColumn}/>
                            </div>
                        </div>
            </Collapsible>
            </div>
       )
   }
}
    
export default Swimlane;