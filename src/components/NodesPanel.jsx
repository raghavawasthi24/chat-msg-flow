import { MessageCircleMore } from 'lucide-react';
import { useDrag } from 'react-dnd';

export const ItemTypes = {
  BOX: 'box',
};

function NodesPanel() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { type: 'message' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div className="flex w-1/4 h-screen overflow-auto p-4 border-l bg-white shadow-lg">
      <div
        ref={drag}
        className={`flex flex-col justify-center items-center border-2 rounded-lg h-fit px-8 py-4 gap-2 cursor-grab transition-opacity duration-200 ${
          isDragging ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <MessageCircleMore className="text-blue-600" />
        <p className="font-semibold text-sm">Message</p>
      </div>
    </div>
  );
}

export default NodesPanel;

// react, next, vue, redux, jest, playwright, tailwind, react-flow, js, ts
