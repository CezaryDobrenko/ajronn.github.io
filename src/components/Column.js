import React from 'react'
import '../css/column.css'
import Note from './Note.js'
import DropBox from './DropBox'

class Column extends React.Component{

    dropStyle = {
        minHeight: "100px",
    }

    

    render(){
            const elements = this.props.notes
            .filter((e) => e.columnid === this.props.id)
            .map((e) => {
            return <Note key={e.id} item={e}/>
        })
        


       return (
           <div className={"column"} id={this.props.id}>
               <div><input style={{width: "70%", display: "block", marginLeft: "auto", marginRight: "auto"}} defaultValue={this.props.title}></input>
                    <DropBox notes = {elements} columnid={this.props.id}></DropBox>
               </div>
               <button onClick={() => this.props.addNote(this.props.id)} style={{bottom: "0px", position: "relative",width: "calc(100% - 20px)", margin: "5px 10px"}}>Add note</button>
               
           </div>
       )
   }
}
    
export default Column