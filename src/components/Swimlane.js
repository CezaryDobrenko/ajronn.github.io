import React from 'react'
import Collapsible from 'react-collapsible'
import Header from "./Header"

class Swimlane extends React.Component{

    constructor(props)
    {
        super(props);
    }
   render(){
       return (
           <div>
            <Collapsible trigger={<div><input style={{width: "150px", height: "20px"}}type="text" defaultValue={this.props.element.title}></input><button onClick={() => this.props.removeSwimlane(this.props.element)}>Remove swimlane</button></div>}>
                <p>TO JEST PRZYKLADOWY SWIMLANE I TU BEDA KOLUMNY</p>
                <p>PRZYKLAD PRZYKLAD</p>
            </Collapsible>
            </div>
       )
   }
}
    
export default Swimlane;