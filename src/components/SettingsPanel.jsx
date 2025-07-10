import { ArrowLeft, MoveLeft } from "lucide-react";
import { useState, useEffect } from "react";

function SettingsPanel({ node, setSelectedNode, setIsSetting }) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (node) setLabel(node.data.label);
  }, [node]);

  const handleChange = (e) => {
    const label = e.target.value;
    if (!node) return;
    setSelectedNode((prev) => ({ ...prev, data: { ...prev.data, label } }));
  };

  return (
    <div className="w-1/4 h-screen overflow-auto p-4 border-l bg-gray-50 shadow-lg flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <ArrowLeft onClick={() => setIsSetting(false)} className="cursor-pointer"/>
        <p className="w-full text-center font-semibold">Message</p>
      </div>

      <label className="text-sm font-medium">Text</label>
      <input
        type="text"
        value={label}
        onChange={handleChange}
        className="p-2 border rounded"
      />
    </div>
  );
}

export default SettingsPanel;
