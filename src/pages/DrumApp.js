import React from "react"

  const audio = [
    { desc: 'Heater 1', clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3', key: 'Q' },
    { desc: 'Heater 2', clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3', key: 'W' },
    { desc: 'Heater 3', clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3', key: 'E' },
    { desc: 'Heater 4', clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3', key: 'A' },
    { desc: 'Clap', clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3', key: 'S' },
    { desc: 'Open-HH', clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3', key: 'D' },
    { desc: 'Kick-n\'-Hat', clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3', key: 'Z' },
    { desc: 'Kick', clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3', key: 'X' },
    { desc: 'Closed-HH', clip: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3', key: 'C' },
  ]

class DrumApp extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            audio_desc: '',
            audio_clip: '',
            audio_col: audio
        }
        this.handleKeydown = this.handleKeydown.bind(this)
        this.setDescription = this.setDescription.bind(this)
    }

    componentDidMount() {
        console.log('Mounted Drum App') 
        document.addEventListener("keydown", this.handleKeydown)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeydown)
    }

    setDescription = (key) => {

        let audio = this.state.audio_col.filter(item => item.key === key)

        if (audio.length === 0) {
            return
        }

        this.setState({
            audio_desc: audio[0].desc
          },() => {
              console.log('Key pressed: %s', key)
              console.log('description %s', audio[0].desc)
          })
    }

    handleKeydown(event) {
        let key = event.key.toUpperCase()
        const button = document.getElementById(key)
        if (button) {
            button.click()
        }
        console.log('Key pressed: %s', key)
        console.log('description %s', audio[0].desc)
    }

    

    render() {
        return (
            <div id="drum-machine" className="container mt-4">
                <h1 className='text-primary text-center mb-4'>Drum Machine</h1>
                <Display audio_desc={this.state.audio_desc} />
                <DrumPads audio_col={this.state.audio_col} setDescription={this.setDescription} />
            </div>
        )
    }
}

class Display extends React.Component {
    componentDidMount() {
        console.log('Mounted Drum Display') 
    }

    
    render() {
        return (
            <div className="container d-flex flex-column align-items-center">
                <div className="card shadow p-4 text-center bg-primary-subtle" style={{width: '100%'}}>
                    <div className="card-body">
                            <h4>Now Playing:</h4>
                            <p id='display' className="text-secondary">{this.props.audio_desc || 'Press a button to play!'}</p>
                    </div>
                </div>
            </div>
        )
    }
}

class DrumPads extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: null
        }
    }

    componentDidMount() {
        console.log('Mounted Drum Pads') 
    }

    handleDrumPad(key) {
        this.props.setDescription(key)
        this.setState({
            activeKey: key
        })

        const audioElement = document.getElementById(key)
        if (audioElement) {
          audioElement.cloneNode(true).play() // doesn't pass 5. & 6. Test case
        // audioElement.play() // default, will pass
        }
      }
    
    render() {
        const drumPads = this.props.audio_col.map(i => 
        <button 
        id={i.desc} 
        key={i.key} 
        className={`btn btn-outline-primary m-2 drum-pad ${this.state.activeKey === i.key ? "active" : ""}`}
        style={{ width: '80px', height: '80px' }} 
        onClick={() => this.handleDrumPad(i.key)}>
            {i.key}
            <audio id={i.key} src={i.clip} className='clip' />
        </button>);
        return (
            <div className="container d-flex justify-content-center">
                <div className="card shadow p-4 text-center bg-primary-subtle" style={{maxWidth: 400, width: '100%'}}>
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

export default DrumApp