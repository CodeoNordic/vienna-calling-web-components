import { createRoot } from 'react-dom/client';
import App from './App';

// Create the React root from <div id="root">
const root = createRoot(document.querySelector('#root')!);
// Render the React app inside the root
root.render(<App />);