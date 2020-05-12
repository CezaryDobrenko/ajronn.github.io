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
                    <Column changeTaskStatus={this.props.changeTaskStatus}
                    changeNoteStatus={this.props.changeNoteStatus} checkUserLimit={this.props.checkUserLimit}
                    changeColor={this.props.changeColor} changeColumnInfo={this.props.changeColumnInfo}
                    changeColumnWIPLimit={this.props.changeColumnWIPLimit} removeNote={this.props.removeNote}
                    removeColumn={this.props.removeColumn} changeProgress={this.props.changeProgress} 
                    changeColumnTitle={this.props.changeColumnTitle} element={e} index={index} 
                    title={e.title} addNote={this.props.addNote} reloadNotesState={this.props.reloadNotesState}/>
                </div>
            )
        })
        let w = 0;
        this.props.columns.map(e => {
            if(e.swimlaneid == this.props.element.id){
                w++;
            }
        })
        w = w*204+250;
        w = w+"px";
       return (
           <div style={{backroundColor:"#7BAEFF"}}>
            <Collapsible overflowWhenOpen="auto" open triggerStyle={{backgroundColor: "rgb(70,83,98)", height: "50px"}}>
                <div>
                
                    <div className="steericon" onClick={() => this.props.removeSwimlane(this.props.element)}><img src={SwimlaneIcon} height="30"/></div><p className="text">Remove swimlane</p>
                    <input type="text" style={{all:"initial",width: "200px",marginLeft:"30%",backgroundColor:"transparent",textAlign:"center",border:"3px solid rgb(70,83,98)",borderRadius:"10px",height:"30px",fontFamily: "'Comic Neue', cursive",marginBottom:"20px"}} defaultValue={this.props.element.title} onChange={(event) => this.props.changeSwimlaneTitle(this.props.element, event.target.value)} /></div>
                        <div className="columnfield" style={{width: w}}>

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