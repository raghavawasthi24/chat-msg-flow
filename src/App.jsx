
import './App.css'
import Playground from './components/Playground';
import NodesPanel from './components/NodesPanel';


function App() {
  return (
    <div className='w-screen h-screen flex'>
      <Playground />
      <NodesPanel />
    </div>
  )
}

export default App
