import React from "react"

const operations = [
    { desc: 'zero', key: '0' , type: 'num'},
    { desc: 'one', key: '1' , type: 'num'},
    { desc: 'two', key: '2' , type: 'num'},
    { desc: 'three', key: '3' , type: 'num'},
    { desc: 'four', key: '4' , type: 'num'},
    { desc: 'five', key: '5' , type: 'num'},
    { desc: 'six', key: '6' , type: 'num'},
    { desc: 'seven', key: '7' , type: 'num'},
    { desc: 'eight', key: '8' , type: 'num'},
    { desc: 'nine', key: '9' , type: 'num'},
    { desc: 'decimal', key: '.' , type: 'num'},
    { desc: 'add', key: '+' , type: 'op'},
    { desc: 'subtract', key: '-' , type: 'op'},
    { desc: 'multiply', key: '*' , type: 'op'},
    { desc: 'divide', key: '/' , type: 'op'},
    { desc: 'equals', key: '=' , type: 'equals'},
    { desc: 'clear', key: 'DELETE' , type: 'clear'},
  ]

class CalculatorApp extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            operations: operations,
            input: "", // clicked element only
            expression: "", // concatenated input
            output: null // evaluated expression
        }
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeydown)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeydown)
    }

    handleKeydown(event) {
        let key = event.key.toUpperCase()
        const button = document.getElementById(key)
        if (button) {
            button.click()
        }
        console.log('Key pressed: %s', key)
    }

    update = (key, type) => {
        if (type === 'num' || type === 'op') {
            this.setState((prevState) => {
                return {
                    input: key, // clicked element only
                    expression: prevState.expression.concat(key), // concatenated input
                    output: null // evaluated expression
                }
            })
        }
        else if (type === 'equals') {
            this.setState({
                output: eval(this.state.expression) // evaluated expression
            })
        }
        else if (type === 'delete') {
            this.setState({
                input: null, // clicked element only
                expression: null, // concatenated input
                output: null // evaluated expression
            })
        }
    }

    render() {
        return (
            <div>
                <div className="container d-flex flex-column align-items-center">
                    <h1 className="text-primary">Calculator</h1>
                    <div className="card shadow p-4 bg-primary-subtle" style={{maxWidth: 600, width: '100%'}}>
                        <div className="card-body">
                            <p id="input" className="fs-4">{this.state.input}</p>
                            <textarea id="expression" className="form-control bg-light" rows="1" readOnly value={this.state.expression} style={{resize: "none"}}></textarea>
                            <p id="output" className="text-secondary">={this.state.output}</p>
                        </div>
                    </div>
                </div>
                <Board operations={this.state.operations} update={this.update} />
            </div>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: null
        }
    }

    handleButton(key, type) {
        this.props.update(key, type)
      }
    
    render() {
        const drumPads = this.props.operations.map(i => 
        <button 
        id={i.desc} 
        key={i.key} 
        className={`btn btn-outline-primary m-2 drum-pad`}
        style={{ width: '80px', height: '80px' }} 
        onClick={() => this.handleButton(i.key, i.type)}>
            {i.key}
            <audio id={i.key} src={i.clip} className='clip' />
        </button>);
        return (
            <div className="container d-flex justify-content-center">
                <div className="card shadow p-4 text-center bg-primary-subtle" style={{maxWidth: 600, width: '100%'}}>
                    <div className="row g-3" id="drum-pad-collection">
                        {drumPads.map((pad, idx) => (
                            <div key={idx} className="col-4 d-flex justify-content-center">
                                {pad}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default CalculatorApp