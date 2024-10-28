import SpaceCanvas from './components/SpaceBackground';
import Header from './components/Header';
import LinkForm from './components/LinkForm';

import './App.css';

function App() {
    return (
        <div className='app'>
            <SpaceCanvas />
            <Header />
            <LinkForm />
        </div>
    );
}

export default App;
