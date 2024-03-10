import './App.css';
import ImageToPdfConverter from './components/ImageToPdfConverter';
import MultiImageToPdfConverter from './components/MultiImageToPdfConverter';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <ImageToPdfConverter />
      <MultiImageToPdfConverter/>
    </div>
  );
}

export default App;
