import React from "react";
import '../css/progress.css'

class ProgressBar extends React.Component {
    calculateProgress(progress, goal) {
        if (Number(goal) >= Number(progress)) {
            return (progress/goal) * 100 + "%"
        }
    }

    render() {
        const { progress, goal } = this.props
        return (
            <div
                className="progress-bar"
                style={{width: this.calculateProgress(progress, goal) }}
            ></div>
        )
    }
}
export default ProgressBar;