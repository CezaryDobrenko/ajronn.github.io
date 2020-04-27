import React from 'react'
import Collapsible from 'react-collapsible'
import ProgressBar from "./ProgressBar";
import '../css/progress.css'

class Progress extends React.Component{
    constructor() {
        super()
        const progressInit = 0
        const goalInit = 100
        this.state = {
            progress: progressInit,
            validProgress: progressInit,
            goal: goalInit,
            validGoal: goalInit
        };

        this.changeProgress = this.changeProgress.bind(this);
        this.changeGoal = this.changeGoal.bind(this);
    }

    changeProgress(event) {
        if (event.target.value) {
            this.setState({progress: event.target.value})
            this.setState({validProgress: event.target.value})
        } else {
            this.setState({progress: event.target.value})
        }
    }

    changeGoal(event) {
        if (event.target.value) {
            this.setState({goal: event.target.value})
            this.setState({validGoal: event.target.value})
        } else {
            this.setState({goal: event.target.value})
        }
    }


    render() {
        return(
            <div>
                <input type="text" className="mb1" value={this.state.progress} onChange={this.changeProgress}/>
                <div className="progress-container">
                    <ProgressBar
                        progress={this.state.validProgress}
                        goal={this.state.validGoal}
                    />
                </div>
            </div>
        )
    }
}

export default Progress;