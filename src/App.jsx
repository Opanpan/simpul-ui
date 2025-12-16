import { Provider } from 'react-redux';
import './App.css';
import FAB from './components/FAB';
import Sidebar from './components/Sidebar';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className='flex min-h-screen'>
        <Sidebar />
        <main className='flex-1 h-screen overflow-y-auto bg-[#1C1C1C] text-black custom-scrollbar'>
          <FAB />
        </main>
      </div>
    </Provider>
  );
}

export default App;
