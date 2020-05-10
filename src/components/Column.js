import React from 'react'
import '../css/column.css'
import Note from './Note.js'
import DropBox from './DropBox'
import Popup from 'reactjs-popup'
import TextareaAutosize from 'react-textarea-autosize'
import ReactTooltip from "react-tooltip";
import Add from '../img/add.png'

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
            return <Note changeNoteStatus={this.props.changeNoteStatus} checkUserLimit={this.props.checkUserLimit} changeColor={this.props.changeColor} color={e.color} removeNote={this.props.removeNote} changeProgress={this.props.changeProgress} index={index} key={e.id} item={e} reloadNotesState={this.props.reloadNotesState}/>
        })
        


       return (
            
           <div className={"column"} style={this.props.element.wiplimit <= this.props.element.notes.length && this.props.element.wiplimit !=0 ? {border: "2px solid red"} : {border: "2px solid rgb(70,83,98)"}} id={this.props.id}>
               <Popup modal contentStyle={{width: "auto"}} trigger={<div className="wiplimitfield" style={this.props.element.wiplimit <= this.props.element.notes.length && this.props.element.wiplimit !=0 ? {backgroundColor: "#ff4d4d"} : {backgroundColor: "rgb(255, 255, 128)", cursor: "pointer", fontWeight: "700"}}>{this.props.element.wiplimit == 0 ? "∞" : this.props.element.wiplimit}</div>} position="top left">
                    <input placeholder="WIP limit" style={{width: "130px", marginLeft: "auto", marginRight: "auto", display: "block"}} maxLength="3" type="text" onChange={(event) => this.props.changeColumnWIPLimit(this.props.element.id,event.target.value)}/>
                    
               </Popup>
               <div className="xbutton" onClick={() => this.props.removeColumn(this.props.element.id)}></div>
               <div>
                    
                    <input style={{width: "70%", display: "block", marginLeft: "auto", marginRight: "auto", paddingTop: "10px", fontFamily: "'Courgette', cursive", color: "white", fontSize: "20px", textAlign: "center"}} defaultValue={this.props.title} onChange={this.changeTitle} />
                    <DropBox height= "100px" notes = {elements} columnid={this.props.element.id}></DropBox>
               </div>
               <div className="addnotebutton" style={{paddingTop: "5px", borderRadius:"10px 0 10px 0"}} onClick={() => this.props.addNote(this.props.element.id)}><img src={Add} style={{display: "block" ,width: "30px", marginLeft: "auto", marginRight: "auto"}} height="30"/></div>
                <Popup modal contentStyle={{width: "auto", height: "auto"}}
                trigger={
                <p><div data-place="bottom" data-tip={this.props.element.info} className="infofield"/></p>}>
                    Change condition<br />
                    <TextareaAutosize defaultValue={this.props.element.info.replace("<br />",String.fromCharCode(10))}
                    onChange={(event) => this.props.changeColumnInfo(this.props.element.id, event.target.value)}/>
                </Popup>
                
                <ReactTooltip multiline={true} />
           </div>
       )
        
   }
}
    
export default Column