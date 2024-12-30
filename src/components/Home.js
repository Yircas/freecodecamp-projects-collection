import React from 'react';
import { marked } from "marked"

const baseURL = "/freecodecamp-projects-collection"

marked.use({
    gfm: true,
    breaks: true
})

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readme: ''
    }
  }

  componentDidMount() {
          fetch('https://raw.githubusercontent.com/Yircas/freecodecamp-projects-collection/refs/heads/master/README.md')
          .then((response) => {
              if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
              }
              return response.text()
          })
          .then((data) => {
              this.setState({
                  readme: marked.parse(data)
              }, () => {
                  const readmeElement = document.getElementById("readme")
                  readmeElement.innerHTML = this.state.readme
              })
          })
          .catch((error) => {
              console.error('Error fetching file:', error)
          })
      }

  render() {
    return (
        <div id='readme'>
        </div>
      )
    }
  }  

  export default Home