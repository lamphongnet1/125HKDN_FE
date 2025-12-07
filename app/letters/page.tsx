"use client";
import { useState } from 'react';
import Hiragana from './components/hiragana/hiragana';
import Katakana from './components/katakana/katakana';
import Kanji from './components/kanji/kanji';
import './page.css';

type Tab = 'HIRAGANA' | 'KATAKANA' | 'KANJI';

export default function Letters() {
    const [activeTab, setActiveTab] = useState<Tab>('HIRAGANA');

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'HIRAGANA':
                return (
                    <div>
                        <Hiragana/>
                    </div>
                );
            case 'KATAKANA':
                return (
                    <div>
                        <Katakana/>
                    </div>
                );
            case 'KANJI':
                return (
                    <div>
                        <Kanji/>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="letters-page">
            <div className="tab-navigation">
                {['HIRAGANA', 'KATAKANA', 'KANJI'].map((tabName) => (
                    <div
                        key={tabName}
                        className={`tab-item ${activeTab === tabName ? 'active' : ''}`}
                        onClick={() => handleTabClick(tabName as Tab)}
                    >
                        {tabName}
                    </div>
                ))}
            </div>

            <div className="progress-bar-container">
                <div
                    className="progress-indicator"
                    style={{
                        width: `${100 / 3}%`,
                        transform: `translateX(${['HIRAGANA', 'KATAKANA', 'KANJI'].indexOf(activeTab) * (300 / 3)}%)`
                    }}
                ></div>
            </div>

            <div className="tab-content-wrapper">
                {renderContent()}
            </div>
        </div>
    );
}