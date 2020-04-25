import React from 'react';
import Kanban from './components/Kanban'
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend'


function App() {
  return (
    <DndProvider backend={Backend}>
      <Kanban/>
    </DndProvider>
      

  );
    
}

export default App;
