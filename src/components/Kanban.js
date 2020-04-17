import React from 'react'
import Collapsible from 'react-collapsible'

class Kanban extends React.Component{
    
   render(){
       return (
           <div>
            <Collapsible trigger="John">
                <p>TO JEST PRZYKLADOWY SWIMLANE I TU BEDA KOLUMNY</p>
                <p>PRZYKLAD PRZYKLAD</p>
            </Collapsible>
            </div>
       )
   }
}
    
export default Kanban;