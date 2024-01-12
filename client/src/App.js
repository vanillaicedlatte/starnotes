import React from 'react';
import './App.css';
import ExploreSection from './components/ExploreSection';
import Logo from './components/Logo';
import Menu from './components/Menu';
import SavedChartsDropdown from './components/charts/SavedChartsDropdown';
import NotesGrid from './components/notes/NotesGrid';
import NewNoteButton from './components/notes/NewNoteButton';
import Sidebar from './components/Sidebar';

function App() {
  return (
<div className="main">
  <div className="top-nav flex justify-between items-center p-6 bg-base-300">
    <Logo />
    <Menu />
    <div className="btn-group flex gap-4">
    <NewNoteButton />
    <button className="btn btn-ghost">My Notes</button>
    </div>
  </div>
  <div className="content grid grid-cols-4 gap-4 p-3">
    <Sidebar />
    <div className="main-content col-span-3 p-3">
      <div className="notes">
        <NotesGrid />
      </div>
      <div className="saved-charts">
        <SavedChartsDropdown />
      </div>
      <div className="explore-section">
        <ExploreSection />
      </div>
    </div>
  </div>
</div>
  );
}

export default App;