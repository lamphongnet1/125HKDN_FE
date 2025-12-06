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
                        <p className="tab-content-title">Đây là nội dung bảng chữ Hiragana</p>
                        <Hiragana/>
                    </div>
                );
            case 'KATAKANA':
                return (
                    <div>
                        <p className="tab-content-title">Đây là nội dung bảng chữ Katakana</p>
                        <Katakana/>
                    </div>
                );
            case 'KANJI':
                return (
                    <div>
                        <p className="tab-content-title">Đây là nội dung chữ Kanji</p>
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