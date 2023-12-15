import React from 'react';
import './App.css';
import CurrentChart from './components/CurrentChart';
import ExploreSection from './components/ExploreSection';
import Logo from './components/Logo';
import Menu from './components/Menu';
import NewNoteButton from './components/NewNoteButton';
import NewNoteFromChartButton from './components/NewNoteFromChartButton';
import RandomNoteButton from './components/RandomNoteButton';
import RecentNotes from './components/RecentNotes';
import SavedChartsDropdown from './components/SavedChartsDropdown';
import Search from './components/Search';
import ViewAllButton from './components/ViewAllButton';

function App() {
  return (
    <div className="main">
      <div className="top-nav">
        <Logo />
        <Menu />
      </div>
      <div className="quick-buttons">
        <NewNoteButton />
        <Search />
        <RandomNoteButton />
      </div>
      <div className="current-chart">
        <CurrentChart />
        <NewNoteFromChartButton />
      </div>
        <RecentNotes />
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