import React from "react"
import DOMPurify from "dompurify"
import { marked } from "marked"

marked.use({
    gfm: true,
    breaks: true
})

class MarkdownApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          input: '',
          output: ''
        }
      this.handleInput = this.handleInput.bind(this);
      }

      handleInput(event) {
        this.setState({
          input: event.target.value,
          output: marked.parse(event.target.value)
        },() => {
            const previewElement = document.getElementById("preview");
            previewElement.innerHTML = this.state.output;
        });
      }

      componentDidMount() {
        // fetch example markdown
            fetch('/data/example.md')
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then((data) => {
            this.setState({
                input: data,
                output: marked.parse(data)
            }, () => {
                const previewElement = document.getElementById("preview");
                previewElement.innerHTML = this.state.output;
            });
        })
        .catch((error) => {
            console.error('Error fetching file:', error);
        });
    }

      render() {
        return (
           <div>
            <h1 className='text-primary text-center'>Markdown Previewer</h1>
             <TextEditor
               input={this.state.input}
               handleInput={this.handleInput}/>
             <Preview
               output={this.state.output}/>
           </div>
        );
      }
    };

class TextEditor extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="container d-flex flex-column align-items-center">
                <div className="card shadow p-4 bg-primary-subtle" style={{width: '100%'}}>
                    <div className="card-body">
                        <h2>Texteditor</h2>
                    <textarea id='editor' value={this.props.input} onChange={this.props.handleInput} style={{width: '100%'}}></textarea>
                    </div>
                </div>
            </div>
            
        )
    }
}

class Preview extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container d-flex flex-column">
                <div className="card shadow p-4 bg-primary-subtle" style={{width: '100%'}}>
                    <div className="card-body">
                        <h2>Preview</h2>
                        <div id='preview'>
                            {/* <HtmlRenderer htmlString={this.props.output} /> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Ensure safe HTML in text input, but FreeCodeCamp's 4. test case will fail
const HtmlRenderer = ({ htmlString }) => {
    const sanitizedHtml = DOMPurify.sanitize(htmlString);
  
    return (
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    );
  };

export default MarkdownApp