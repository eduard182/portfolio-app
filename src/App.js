import React, { Component } from 'react';
import './App.css';
import './normalize.css';
import Page1 from './Page1'
import MenuDrawer from './MenuDrawer'
import Page2 from './Page2'
import Page3 from './Page3'
import projects from './projects.json'
import logo from './thumbnails/sdlogo.svg'
import hamburger from './thumbnails/hamburger.svg'
/*,<Page4 key='4'/>,<Page5 key='5'/>*/

//importing all images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const thumbnails = importAll(require.context('./thumbnails', false, /\.(png|jpe?g|svg)$/));

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            home: true,//1 PAGE INITIALIZES WITH HOMEPAGE
            page: false,
            modal: false,
            projects: [],
            thumbnails:{},
            pages: [<Page1 />, <Page2 projects={projects} thumbnails={thumbnails}/>, <Page3 projects={projects} thumbnails={thumbnails}/>]
            

        }
        this.toggleModal = this.toggleModal.bind(this)
        this.togglePage = this.togglePage.bind(this)
        this.handleHomeButton = this.handleHomeButton.bind(this)
        this.indexP = this.indexP.bind(this)
        //this.projects = this.projects.bind(this)
    }
    componentDidMount() {
        this.setState({ projects: projects })
        this.setState({ thumbnails: thumbnails })
    }

    //2 USER OPENS MODAL= HOME:TRUE, MODAL:TRUE, PAGE:FALSE
    toggleModal() {
        this.setState(({ modal }) => ({ modal: !modal }));
    }
    //3 USER CLICKS ON PAGE= HOME:FALSE, MODAL:FALSE, PAGE:TRUE
    indexP(e) {
        const modal = this.state.modal
        const page = this.state.page
        const home = this.state.home
        this.toggleHome()
        this.togglePage()
        this.setState({ key: e.target.dataset.key })
        this.toggleModal()
    }

    togglePage() {
        this.setState(({ page }) => ({ page: !page }))
    }
    toggleHome() {
        this.setState(({ home }) => ({ home: !home }));
    }

    //4 USER CLICKS ON HOME BUTTON= HOME:TRUE, MODAL:FALSE, PAGE:FALSE
    handleHomeButton() {
        this.toggleHome()
        this.togglePage()
    }

    render() {
        const modal = this.state.modal
        const page = this.state.page
        const home = this.state.home
        const index = this.state.key
        return (
            <div className="App">
                <button
                    className="back-button"
                    aria-label="back button"
                    onClick={!home ? this.handleHomeButton : null}>
                    <img src={logo} alt="Back Button"></img>
                </button>
                {home &&
                    <nav
                        className="nav"
                        onClick={this.toggleModal}>
                        <a title="menu" aria-label="menu">
                            <img src={hamburger} alt="Back Button"></img>
                        </a>
                    </nav>}
                {!page && <Page1 />}
                {modal &&
                    <MenuDrawer
                        toggleModal={this.toggleModal}
                        togglePage={this.togglePage}
                        indexP={this.indexP}
                    />}
                {!home && this.state.pages[index]}


            </div>
        )
    }
}

export default App;