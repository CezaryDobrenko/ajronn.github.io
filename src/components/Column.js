import React from 'react'
import '../css/column.css'
import Note from './Note.js'
import DropBox from './DropBox'
import Popup from 'reactjs-popup'
import TextareaAutosize from 'react-textarea-autosize'

class Column extends React.Component{

    dropStyle = {
        minHeight: "100px",
    }

    

    changeTitle = (e) => {
        this.props.changeColumnTitle(this.props.element.id,e.target.value)
    }
    

    render(){

            const elements = this.props.element.notes
            .map((e,index) => {
            return <Note removeNote={this.props.removeNote} changeProgress={this.props.changeProgress} index={index} key={e.id} item={e} reloadNotesState={this.props.reloadNotesState}/>
        })
        
        

       return (
            
           <div className={"column"} style={this.props.element.wiplimit <= this.props.element.notes.length && this.props.element.wiplimit !=0 ? {border: "2px solid red"} : {border: "none"}} id={this.props.id}>
               <Popup modal contentStyle={{width: "auto"}} trigger={<div className="wiplimitfield" style={this.props.element.wiplimit <= this.props.element.notes.length && this.props.element.wiplimit !=0 ? {backgroundColor: "#ff4d4d"} : {backgroundColor: "rgb(255, 255, 128)"}}>{this.props.element.wiplimit == 0 ? "∞" : this.props.element.wiplimit}</div>} position="top left">
                    <input placeholder="WIP limit" style={{width: "130px", marginLeft: "auto", marginRight: "auto", display: "block"}} maxLength="3" type="text" onChange={(event) => this.props.changeColumnWIPLimit(this.props.element.id,event.target.value)}/>
                    
               </Popup>
               <div className="xbutton" onClick={() => this.props.removeColumn(this.props.element.id)}></div>
               <div>
                    
                    <input style={{width: "70%", display: "block", marginLeft: "auto", marginRight: "auto", paddingTop: "10px"}} defaultValue={this.props.title} onChange={this.changeTitle} />
                    <DropBox notes = {elements} columnid={this.props.element.id}></DropBox>
               </div>
               <button onClick={() => this.props.addNote(this.props.element.id)} style={{bottom: "0px", position: "relative",width: "calc(100% - 20px)", margin: "5px 10px"}}>Add note</button>
                <Popup modal contentStyle={{width: "auto"}} trigger={<p data-place="bottom" data-tip={this.props.element.info}><div className="infofield"/></p>}>Change condition<TextareaAutosize defaultValue={this.props.element.info.replace("<br />",String.fromCharCode(10))} onChange={(event) => this.props.changeColumnInfo(this.props.element.id, event.target.value)}/></Popup>
                

           </div>
       )
        
   }
}
    
export default Column