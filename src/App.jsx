import { useEffect } from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import IndexHomePage from './Components/HomePage';

function App() {
    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);
    return (
        <div>
            <header>
                <Header />
            </header>
            <main className="container">
                <IndexHomePage />
            </main>
            {/* <footer className="container">
                <Footer />
            </footer> */}
        </div>
    );
}

export default App;
