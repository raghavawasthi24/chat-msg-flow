import "./App.css";
import Playground from "./components/Playground";
import NodesPanel from "./components/NodesPanel";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ReactFlowProvider } from "@xyflow/react";

function App() {
  return (
    <DndProvider backend={HTML5Backend}> 
     <ReactFlowProvider>
          <div className="w-screen h-screen flex">
            <Playground />
            <NodesPanel/>
          </div>
    </ReactFlowProvider>
    </DndProvider>
  );
}

export default App;
