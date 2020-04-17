import React from 'react'
import Column from './Column'

class Swimlane extends React.Component {

    
    constructor(props){
        super(props)

    }
    
    state = {
        inputValue: ''
    }
    
    changeTitleHandler(e){
      this.props.changeTitle(this.props.element,e.target.value)
    }

    render(){
        const elements = this.props.columns.map(e => {
            return <Column element={e} />
        })
        return(
            <div className="swimlane" key={this.props.element.id}>
                <div className='headofswimlane'>
                    <input type="text" placeholder="Name" defaultValue={this.props.element.title} onChange={this.changeTitleHandler.bind(this)}></input>
                </div>
                {elements}
                <div className="closeswimlinebutton" onClick={() => this.props.removeSwimlane(this.props.element)}></div>
            </div>
        )
    }
}
export default Swimlane