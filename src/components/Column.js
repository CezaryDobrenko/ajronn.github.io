import React from 'react'
import '../css/column.css'
import Note from './Note.js'
import DropBox from './DropBox'

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
            return <Note index={index} key={e.id} item={e} reloadNotesState={this.props.reloadNotesState}/>
        })
        
        

       return (
           <div className={"column"} id={this.props.id}>
               <div><input style={{width: "70%", display: "block", marginLeft: "auto", marginRight: "auto"}} defaultValue={this.props.title} onChange={this.changeTitle} />
                    <DropBox notes = {elements} columnid={this.props.element.id}></DropBox>
               </div>
               <button onClick={() => this.props.addNote(this.props.element.id)} style={{bottom: "0px", position: "relative",width: "calc(100% - 20px)", margin: "5px 10px"}}>Add note</button>
               
           </div>
       )
        
   }
}
    
export default Column