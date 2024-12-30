import { Link } from "react-router-dom"

const Navigation = function() {
    const baseURL = "/freecodecamp-projects-collection"
    return (
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" to={`${baseURL}/`}>FreeCodeCamp Projects Collection</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to={`${baseURL}/`}>Home</Link>
              </li>
              <li class="nav-item dropdown">
                <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Projects
                </Link>
                <ul class="dropdown-menu">
                  <li><Link class="dropdown-item" to={`${baseURL}/quotesApp`}>Quotes-App</Link></li>
                  <li><Link class="dropdown-item" to={`${baseURL}/markdownApp`}>Markdown-App</Link></li>
                  <li><Link class="dropdown-item" to={`${baseURL}/drumApp`}>Drum Machine</Link></li>
                  <li><Link class="dropdown-item" to={`${baseURL}/calculatorApp`}>Calculator</Link></li>
                  <li><Link class="dropdown-item" to={`${baseURL}/clockApp`}>Clock</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }

export default Navigation