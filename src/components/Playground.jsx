import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./NodesPanel";

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

let nodeId = 3;

export default function Playground() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((es) => addEdge(params, es)),
    []
  );

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const wrapperBounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = screenToFlowPosition({
        x: offset.x - wrapperBounds.left,
        y: offset.y - wrapperBounds.top,
      });

      const newNode = {
        id: `n${nodeId++}`,
        type: "default",
        position,
        data: { label: `Message Node` },
      };

      setNodes((prev) => [...prev, newNode]);
    },
  }));

  return (
      <div ref={reactFlowWrapper} style={{ width: "100vw", height: "100vh" }}>
        <div ref={drop} style={{ width: "100%", height: "100%" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
  );
}
