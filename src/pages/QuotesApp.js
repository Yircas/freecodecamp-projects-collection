import React from 'react'
import ReactDOM from 'react-dom'
import '../index'
import readCSV from '../fetchData'

const QuotesApp = () => (
            <div>
                <h1 className='text-primary text-center'>Random Anime Quotes</h1>
                <QuoteBox />
            </div>
        )

class QuoteBox extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            text: '',
            author: '',
            anime: '',
            data: []
        }
        this.twitterURL =''
        
        // binding functions
        this.setRandomEntry = this.setRandomEntry.bind(this)
    }

    componentDidMount() {
        // fetch data of quotes
        readCSV('data/AnimeQuotes.csv')
            .then((file) => {
                console.log(file)
                this.setState({data: file}, () => {
                    console.log(this.state.data)
                    // get first quote upon loading the page
                    this.setRandomEntry()
                })
            })
            .catch((error) => {
                console.error('Error reading CSV:', error)
                })
        
    }

    setRandomEntry() {
        const csvSize = this.state.data.length
        const i = Math.floor(Math.random() * csvSize)
        const entry = this.state.data[i]
        this.setState({
            text: entry.Quote,
            author: entry.Character,
            anime: entry.Anime,
        }, () => {
            // update URL to twitter
            const param1 = this.state.text
            const param2 = this.state.author
            const param3 = this.state.anime
            document.getElementById('tweet-quote').href = "https://twitter.com/intent/tweet?text=" + param1 + "%0A+%2D" + param2 + "+%28" + param3 + "%29"
        })
    }

    render() {
        return (
            <div id="quote-box" className="container d-flex flex-column align-items-center justify-content-center vh-100">
                <div className="card shadow p-4 text-center bg-primary-subtle" style={{maxWidth: 600, width: '100%'}}>
                    <div className="card-body">
                    <p id="text" className="card-text fs-4 fw-bold quote">"{this.state.text}"</p>
                    <p id="author" className="text-muted fst-italic mb-2">- {this.state.author}</p>
                    <p id="anime" className="text-secondary">From: {this.state.anime}</p>
                    <div className="d-grid gap-2 mt-3">
                        <button id="new-quote" className="btn btn-primary btn-lg" onClick={this.setRandomEntry}>
                            <i className="fas fa-quote-left"></i>
                            Show me a new quote
                        </button>
                        <a id="tweet-quote" href="https://twitter.com/intent/tweet" className="btn btn-info text-white btn-lg">
                            <i className="fa-brands fa-x-twitter"></i>
                            Tweet this
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

// ReactDOM.render(<QuotesApp />, document.getElementById('root'))

export default QuotesApp