import React from "react"

// squish num between min and max
function clamp(num, min, max) {
    return Math.max(Math.min(num, max), min)
}

// formats time in milliseconds to mm:ss
function formatTime(time) {
    const totalSec = Math.round(time / 1000)
    const min = Math.floor(totalSec / 60)
    const sec = totalSec % 60
    const min_pad = min.toString().padStart(2, "0")
    const sec_pad = sec.toString().padStart(2, "0")
    return min_pad + ":" + sec_pad
}

class ClockApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sessionLength: 25,
            breakLength: 5,
            time: 25 * 60 * 1000, // time left in milliseconds, should be formatted to mm:ss
            running: false, // stops/runs clock
            active: "Session", // either "Session" or "Break"
            switched: false // recognizes a recent switch in this.state.active
        }
    }

    // puts all settings in the state back to default
    reset = () => {
        // stop timer, if still running
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null
        }

        // reset state
        this.setState({
            sessionLength: 25,
            breakLength: 5,
            time: 25 * 60 * 1000,
            running: false,
            active: "Session",
            switched: false
        })
    }

    // increments/decrements the [type]Length by specified amount
    setTime = (type, amount) => {
        // only allow changing time, when paused
        if (this.state.running) return

        if (type === "Session") {
            this.setState((prevState) => ({
                sessionLength: clamp(prevState.sessionLength + amount, 1, 60),
                time: prevState.active === "Session" ? clamp(prevState.sessionLength + amount, 1, 60) * 60 * 1000 : prevState.time
            }))
        } else if (type === "Break") {
            this.setState((prevState) => ({
                breakLength: clamp(prevState.breakLength + amount, 1, 60),
                time: prevState.active === "Break" ? clamp(prevState.breakLength + amount, 1, 60) * 60 * 1000 : prevState.time
            }))
        } else {
            console.log("ERROR: Could not set time for %s", type);
        }
    }

    // un-/pauses the timer
    toggleTimer = () => {
        if (!this.state.running) {
            // Timer is starting
            const startTime = Date.now()
            const initialTime = this.state.time
    
            this.timerInterval = setInterval(() => {
                this.setState((prevState) => {
                    const elapsed = Date.now() - startTime
                    const remainingTime = Math.max(0, initialTime - elapsed)
    
                    if (remainingTime <= 0) {
                        // Switch between Session and Break
                        const nextActive = prevState.active === "Session" ? "Break" : "Session"
                        const nextTime =
                            nextActive === "Session"
                                ? prevState.sessionLength * 60 * 1000
                                : prevState.breakLength * 60 * 1000
    
                        clearInterval(this.timerInterval)
                        return {active: nextActive, time: nextTime, running: false, switched: true}
                    }
                    return {time: remainingTime}
                })
            }, 1000)
        } else {
            // Timer is stopping
            clearInterval(this.timerInterval)
            this.timerInterval = null
        }
    
        // Toggle running state
        this.setState((prevState) => ({
            running: !prevState.running,
        }))
    }

    componentDidUpdate() {
        if (this.state.switched) {
            this.setState({switched: false}, () => this.toggleTimer())
        }
    }

    render() {
        return (
            <div className="container mt-5">
                <h1 className="text-primary text-center mb-4">25 + 5 Clock</h1>
                <div className="card shadow p-4 text-center bg-light" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <div className="card-body">
                        {/* Session and Break Length Display */}
                        <div className="row mb-4">
                            <div className="col">
                                <h5 id="session-label" className="text-secondary">Session Length</h5>
                                <p id="session-length" className="h3 text-primary">{this.state.sessionLength}</p>
                            </div>
                            <div className="col">
                                <h5 id="break-label" className="text-secondary">Break Length</h5>
                                <p id="break-length" className="h3 text-primary">{this.state.breakLength}</p>
                            </div>
                        </div>

                        {/* Timer Display */}
                        <div className="mb-4">
                            <h5 id="timer-label" className="text-secondary">{this.state.active}</h5>
                            <p id="time-left" className="display-4 text-danger">{formatTime(this.state.time)}</p>
                        </div>

                        {/* Controls */}
                        <div className="mb-4">
                            <div className="btn-group me-2">
                                <button id="session-decrement" className="btn btn-outline-primary" onClick={() => this.setTime("Session", -1)}>Session <i className="fa-solid fa-minus"></i></button>
                                <button id="session-increment" className="btn btn-outline-primary" onClick={() => this.setTime("Session", 1)}>Session <i className="fa-solid fa-plus"></i></button>
                            </div>
                            <div className="btn-group">
                                <button id="break-decrement" className="btn btn-outline-secondary" onClick={() => this.setTime("Break", -1)}>Break <i className="fa-solid fa-minus"></i></button>
                                <button id="break-increment" className="btn btn-outline-secondary" onClick={() => this.setTime("Break", 1)}>Break <i className="fa-solid fa-plus"></i></button>
                            </div>
                        </div>

                        {/* Start/Stop and Reset Buttons */}
                        <div>
                            <button id="start_stop" className="btn btn-success me-2 w-25 p-2" onClick={this.toggleTimer}><i className={this.state.running ? "fas fa-pause" : "fas fa-play"}></i></button>
                            <button id="reset" className="btn btn-danger w-25 p-2" onClick={this.reset}><i className="fa-solid fa-arrow-rotate-left"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




export default ClockApp