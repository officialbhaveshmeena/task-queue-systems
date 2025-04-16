import logo from './logo.svg';
import './App.css';
import ImageStatus from './components/ImageStatus';
import ImageUploader from './components/ImageUploader';
import ImageList from './components/ImageList';

function App() {
  return (
    <div className="App">
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🖼️ Image Resizer</h1>
      <ImageUploader />
      <ImageStatus />
      <hr />
      <ImageList />

    </div>
    </div>
  );
}

export default App;
