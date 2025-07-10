import "./App.css";
import Playground from "./components/Playground";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactFlowProvider } from "@xyflow/react";
import { useState } from "react";
import Topbar from "./components/Topbar";

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isSetting, setIsSetting] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <ReactFlowProvider>
        <div className="w-screen h-screen flex flex-col">
          <Topbar nodes={nodes} edges={edges}/>
          <div className="flex">
            <Playground
              nodes={nodes}
              edges={edges}
              setNodes={setNodes}
              setEdges={setEdges}
              setIsSetting={setIsSetting}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
            />
            {!isSetting ? (
              <NodesPanel />
            ) : (
              <SettingsPanel
                node={selectedNode}
                setSelectedNode={setSelectedNode}
                setIsSetting={setIsSetting}
              />
            )}
          </div>
        </div>
      </ReactFlowProvider>
    </DndProvider>
  );
}

export default App;
