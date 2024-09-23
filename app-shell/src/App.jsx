import './App.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {Router} from "./router";

const App = () => {
    return (
        <>
            <Header/>
            <Router/>
            <Footer/>
        </>
    );
};

export default App;
