import { useState, useCallback, useRef, useEffect } from "react";
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

let nodeId = 3;

export default function Playground({ setIsSetting, selectedNode, setSelectedNode, nodes, edges, setNodes, setEdges }) {


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

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setIsSetting(true);
  };

  const updateNodeLabel = (id, newLabel) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
      )
    );
  };

  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node?.id === selectedNode?.id ? selectedNode : node
      )
    );
  }, [selectedNode]);

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
        data: { label: 'Message Node' },
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
          onNodeClick={onNodeClick}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

