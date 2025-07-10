import { useState } from "react";

function Topbar({ nodes, edges }) {
  const [msg, setMsg] = useState("");
  function doAllNodesHaveIncomingEdge(nodes, edges) {
    const incomingCounts = {};

    nodes.forEach((node) => {
      incomingCounts[node.id] = 0;
    });

    edges.forEach((edge) => {
      incomingCounts[edge.target] += 1;
    });

    setMsg(
      nodes.every((node, index) => {
        if (index === 0) return true; 
        return incomingCounts[node.id] > 0;
      })
        ? "Saved successfully"
        : "Please add incoming edges to all nodes"
    );
  }
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <p className="text-lg font-semibold"></p>
      <button
        className=" px-4 py-2 rounded border cursor-pointer"
        onClick={doAllNodesHaveIncomingEdge}
      >
        Save Changes
      </button>
    </div>
  );
}

export default Topbar;
