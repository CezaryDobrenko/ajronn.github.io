import React from 'react'
import Collapsible from 'react-collapsible'
import Popup from "reactjs-popup"
import AddColumnInput from "./AddColumnInput"
import '../css/swimlane.css'
import Column from './Column.js'

class Swimlane extends React.Component{   
    
    render(){
        const elements = this.props.columns
        .filter((e) => e.swimlaneid === this.props.element.id)
        .map((e,index) => {
            return(
                <div key = {e.id}>
                    <Column changeColumnInfo={this.props.changeColumnInfo} changeColumnWIPLimit={this.props.changeColumnWIPLimit} removeNote={this.props.removeNote} removeColumn={this.props.removeColumn} changeProgress={this.props.changeProgress} changeColumnTitle={this.props.changeColumnTitle} element={e} index={index} title={e.title} addNote={this.props.addNote} reloadNotesState={this.props.reloadNotesState}/>
                </div>
            )
        })

       return (
           <div>
            <Collapsible triggerStyle={{backgroundColor: "rgb(70,83,98)", height: "50px"}} >
                <div style={{width: "100%", height: "50px", borderBottom: "1px solid black"}}><button onClick={() => this.props.removeSwimlane(this.props.element)}>- swimlane</button><input type="text" style={{width: "auto"}} defaultValue={this.props.element.title} onChange={(event) => this.props.changeSwimlaneTitle(this.props.element, event.target.value)} /></div>
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