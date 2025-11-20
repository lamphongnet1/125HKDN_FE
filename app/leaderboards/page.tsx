"use client";
export default function Leaderboards() {
    return (
        <div className="leaderboard-wrapper">
            <style jsx>{`
                .leaderboard-wrapper {
                    width: 100%;
                    max-width: 500px;
                    margin: 0 auto;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                }

                .container {
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    overflow: hidden;
                }

                .header {
                    text-align: center;
                    padding: 30px 20px 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }

                .header h1 {
                    font-size: 24px;
                    margin-bottom: 8px;
                    font-weight: 600;
                }

                .header p {
                    font-size: 14px;
                    opacity: 0.95;
                    margin-bottom: 5px;
                }

                .time-badge {
                    display: inline-block;
                    background: rgba(255,255,255,0.2);
                    padding: 4px 12px;
                    border-radius: 12px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #ffd700;
                }

                .leaderboard {
                    padding: 20px;
                }

                .rank-item {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    margin-bottom: 10px;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .rank-item:hover {
                    transform: translateX(5px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .rank-item.highlight {
                    background: linear-gradient(90deg, #d4fc79 0%, #96e6a1 100%);
                    box-shadow: 0 4px 15px rgba(150,230,161,0.4);
                }

                .rank-number {
                    font-size: 18px;
                    font-weight: 600;
                    color: #666;
                    min-width: 30px;
                }

                .avatar-container {
                    position: relative;
                    margin: 0 15px;
                }

                .avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                }

                .badge {
                    position: absolute;
                    bottom: -3px;
                    right: -3px;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }

                .username {
                    flex: 1;
                    font-size: 16px;
                    font-weight: 500;
                    color: #333;
                }

                .score {
                    font-size: 16px;
                    font-weight: 600;
                    color: #666;
                }

                .avatar-1 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
                .avatar-2 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
                .avatar-3 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
                .avatar-4 { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
                .avatar-5 { background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); }
                .avatar-6 { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); }
                .avatar-7 { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); }

                .badge-1 { background: #FFD700; }
                .badge-2 { background: #FFA500; }
                .badge-3 { background: #FF6B6B; }
                .badge-4 { background: #4ECDC4; }
                .badge-5 { background: #95E1D3; }
                .badge-6 { background: #C7CEEA; }
                .badge-7 { background: #B8E994; }
            `}</style>

            <div className="container">
                <div className="header">
                    <h1>Top 10 người dùng xuất sắc nhất</h1>
                    <p>Càng học tập nhiều, bạn càng đạt điểm cao</p>
                </div>

                <div className="leaderboard">
                    <div className="rank-item">
                        <div className="rank-number">1</div>
                        <div className="avatar-container">
                            <div className="avatar avatar-1">Z</div>
                            <div className="badge badge-1">🏅</div>
                        </div>
                        <div className="username">zett shu</div>
                        <div className="score">888 Điểm</div>
                    </div>

                    <div className="rank-item highlight">
                        <div className="rank-number">2</div>
                        <div className="avatar-container">
                            <div className="avatar avatar-2">B</div>
                            <div className="badge badge-2">⭐</div>
                        </div>
                        <div className="username">Bạn</div>
                        <div className="score">721 Điểm</div>
                    </div>

                    <div className="rank-item">
                        <div className="rank-number">3</div>
                        <div className="avatar-container">
                            <div className="avatar avatar-3">P</div>
                            <div className="badge badge-3">🔥</div>
                        </div>
                        <div className="username">parks</div>
                        <div className="score">469 Điểm</div>
                    </div>

                    <div className="rank-item">
                        <div className="rank-number">4</div>
                        <div className="avatar-container">
                            <div className="avatar avatar-4">D</div>
                            <div className="badge badge-4">⚡</div>
                        </div>
                        <div className="username">Damion</div>
                        <div className="score">339 Điểm</div>
                    </div>

                    <div className="rank-item">
                        <div className="rank-number">5</div>
                        <div className="avatar-container">
                            <div className="avatar avatar-5">J</div>
                            <div className="badge badge-5">💎</div>
                        </div>
                        <div className="username">Jesús Martínez</div>
                        <div className="score">305 Điểm</div>
                    </div>

                    <div className="rank-item">
                        <div className="rank-number">6</div>
                        <div className="avatar-container">
                            <div className="avatar avatar-6">T</div>
                            <div className="badge badge-6">🇺🇸</div>
                        </div>
                        <div className="username">trevino</div>
                        <div className="score">269 Điểm</div>
                    </div>

                    <div className="rank-item">
                        <div className="rank-number">7</div>
                        <div className="avatar-container">
                            <div className="avatar avatar-7">B</div>
                            <div className="badge badge-7">🌟</div>
                        </div>
                        <div className="username">Benedita Sousa</div>
                        <div className="score">261 Điểm</div>
                    </div>
                </div>
            </div>
        </div>
    );
}