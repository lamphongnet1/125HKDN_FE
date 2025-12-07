"use client";
import './page.css';
export default function Leaderboards() {
    return (
        <div className="leaderboard-wrapper">
            <div className="container">
                <div className="header">
                    <h1>Top 10 người dùng xuất sắc nhất</h1>
                    <p>Càng học tập nhiều, bạn càng đạt điểm cao</p>
                </div>

                <div className="leaderboard">
                    <div className="rank-item">
                        <div className="rank-number">1</div>
                        <div className="avatar-container">
                            <img src="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg" alt="Avatar 1" className="avatar avatar-1" />
                        </div>
                        <div className="username">zett shu</div>
                        <div className="score">888 Điểm</div>
                    </div>

                    <div className="rank-item highlight">
                        <div className="rank-number">2</div>
                        <div className="avatar-container">
                            <img src="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg" alt="Avatar 1" className="avatar avatar-1" />
                        </div>
                        <div className="username">Bạn</div>
                        <div className="score">721 Điểm</div>
                    </div>

                    <div className="rank-item">
                        <div className="rank-number">3</div>
                        <div className="avatar-container">
                           <img src="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg" alt="Avatar 1" className="avatar avatar-1" />
                        </div>
                        <div className="username">parks</div>
                        <div className="score">469 Điểm</div>
                    </div>

                    <div className="rank-item">
                        <div className="rank-number">4</div>
                        <div className="avatar-container">
                            <img src="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg" alt="Avatar 1" className="avatar avatar-1" />
                        </div>
                        <div className="username">Damion</div>
                        <div className="score">339 Điểm</div>
                    </div>

                    <div className="rank-item">
                        <div className="rank-number">5</div>
                        <div className="avatar-container">
                            <img src="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg" alt="Avatar 1" className="avatar avatar-1" />
                        </div>
                        <div className="username">Jesús Martínez</div>
                        <div className="score">305 Điểm</div>
                    </div>

                    <div className="rank-item">
                        <div className="rank-number">6</div>
                        <div className="avatar-container">
                            <img src="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg" alt="Avatar 1" className="avatar avatar-1" />
                        </div>
                        <div className="username">trevino</div>
                        <div className="score">269 Điểm</div>
                    </div>
                    <div className="rank-item">
                        <div className="rank-number">7</div>
                        <div className="avatar-container">
                           <img src="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg" alt="Avatar 1" className="avatar avatar-1" />
                        </div>
                        <div className="username">Benedita Sousa</div>
                        <div className="score">261 Điểm</div>
                    </div>
                </div>
            </div>
        </div>
    );
}