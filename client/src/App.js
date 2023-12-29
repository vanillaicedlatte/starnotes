import React from 'react';
import './App.css';
import CurrentChart from './components/charts/CurrentChart';
import ExploreSection from './components/ExploreSection';
import Logo from './components/Logo';
import Menu from './components/Menu';
import SavedChartsDropdown from './components/charts/SavedChartsDropdown';
import Search from './components/Search';
import NewNote from './components/notes/NewNote';
import NotesGrid from './components/notes/Notes';
import ViewAllButton from './components/ViewAllButton';

function App() {
  return (
    <div className="main">
      <div className="top-nav">
        <Logo />
        <Menu />
      </div>
      <div className="quick-buttons">
        <Search />
      </div>
      <div className="current-chart">
        <CurrentChart />
      </div>
      <div className="notes">
        <NotesGrid />
      </div>
      <div className="new-note">
        <NewNote />
      </div>
        <ViewAllButton />
      <div className="saved-charts">
        <SavedChartsDropdown />
      </div>
      <div className="explore-section">
        <ExploreSection />
      </div>
    </div>
  );
}

export default App;