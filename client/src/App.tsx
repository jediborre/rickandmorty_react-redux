import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
// import Navbar from './components/Navbar/Navbar';
import banner from './img/banner.jpg';

function App() {
  return (
    <>
      {/* <Navbar title="Prueba Técnica React Rick y Morty"></Navbar> */}
      <div className="container mx-auto px-4 h-full">.
        <div className="pb-4 flex justify-center">
          <img src={banner} alt="Rick y Morty" className="w-1/2" />
        </div>
        <SearchBar />
      </div>
    </>
  );
}

export default App;
