// Prefix with "jsx:" to convert svg to a react component (see .parcelrc and types/files.d.ts)
import ReactIcon from 'jsx:@icons/React-icon.svg';

const App = () => {
    return <div className="hello-container">
        <div className="hello">
            <h1>Hello World!</h1>
            <ReactIcon className="react-icon" />
            <p>The React App successfully rendered!</p>
        </div>
    </div>
}

export default App;