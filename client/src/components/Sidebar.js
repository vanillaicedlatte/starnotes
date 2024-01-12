import React from 'react';
import CurrentChart from './charts/CurrentChart';

const Sidebar = () => {
    return (
        <div className="sidebar col-span-1 p-3">
            <div className="sidebar-chart">
            <h2>Chart of the Moment</h2>
                <div className="current-chart">
                    <CurrentChart />
                </div>
            </div>
            <div className="sidebar-blog">
                <h2>Weekly Horoscopes</h2>
            </div>
            <div className="sidebar-saved-charts">
                <h2>Saved Charts</h2>
            </div>

        </div>
    );
};

export default Sidebar;