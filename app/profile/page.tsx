"use client"
import Head from 'next/head';

export default function Profile() {
  return (
    <>
      <Head>
        <title>Bảo Nguyễn</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="khung">
        <div className="phần_hồ_sơ">
          <div className="nút_chỉnh_sửa">✏️</div>

          <div className="ảnh_đại_diện">
            <div className="viền_xanh"></div>
            <svg className="cây_cộng" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="35" fill="#a0e5ff" />
              <circle cx="50" cy="30" r="18" fill="#7fd1ff" />
              <circle cx="35" cy="40" r="15" fill="#7fd1ff" />
              <circle cx="65" cy="40" r="15" fill="#7fd1ff" />
              <text x="50" y="58" fontSize="40" textAnchor="middle" fill="white">+</text>
            </svg>
          </div>

          <div className="tên_người_dùng">Bảo Nguyễn</div>
          <div className="tên_tài_khoản">BoNguyen774305</div>
          <div className="ngày_tham_gia">Đã tham gia Tháng Ba 2023</div>

          <div className="thống_kê">
            <div>Đang theo dõi <strong>0</strong></div>
            <div>Người theo dõi <strong>0</strong></div>
            <span className="cờ_mỹ">🇺🇸</span>
          </div>
        </div>

        <div className="danh_sách_thống_kê">
          <div className="ô_thống_kê"><div className="số_lớn màu_xám">0</div><div>Ngày streak</div></div>
          <div className="ô_thống_kê"><div className="số_lớn màu_vàng">228</div><div>Tổng điểm KN</div></div>
          <div className="ô_thống_kê"><div className="số_lớn màu_xám">Chưa có xếp hạng</div><div>Giải đấu hiện tại</div></div>
          <div className="ô_thống_kê"><div className="số_lớn màu_xám">0</div><div>Số lần đạt top 3</div></div>
        </div>

        <div className="phần_thành_tích">
          <div className="tiêu_đề_thành_tích">
            <span>Thành tích</span>
            <a href="#" className="xem_tất_cả">XEM TẤT CẢ</a>
          </div>

          <div className="mục_thành_tích">
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/achievements/5f5d5e9f.png" className="icon_thành_tích" />
            <div className="tiến_độ">
              <div className="tên_thành_tích">Lửa rừng <span style={{ color:'#888', fontWeight:'normal' }}>Cấp 1</span></div>
              <div className="mô_tả">Đạt chuỗi 3 ngày streak</div>
              <div className="thanh_tiến_độ"><div className="đã_hoàn_thành" style={{ width:'66%' }}></div></div>
              <div className="số_tiến_độ">2/3</div>
            </div>
          </div>

          <div className="mục_thành_tích">
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/achievements/legendary.png" className="icon_thành_tích" />
            <div className="tiến_độ">
              <div className="tên_thành_tích">Cao nhân <span style={{ color:'#888', fontWeight:'normal' }}>Cấp 2</span></div>
              <div className="mô_tả">Đạt được 250 KN</div>
              <div className="thanh_tiến_độ"><div className="đã_hoàn_thành" style={{ width:'91%' }}></div></div>
              <div className="số_tiến_độ">228/250</div>
            </div>
          </div>

          <div className="mục_thành_tích">
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/achievements/champion.png" className="icon_thành_tích" />
            <div className="tiến_độ">
              <div className="tên_thành_tích">Quán quân <span style={{ color:'#888', fontWeight:'normal' }}>Cấp 1</span></div>
              <div className="mô_tả">Mở khóa Bảng Xếp Hạng khi hoàn thành 10 bài học</div>
              <div className="thanh_tiến_độ"><div className="đã_hoàn_thành" style={{ width:'0%' }}></div></div>
              <div className="số_tiến_độ">0/1</div>
            </div>
          </div>
        </div>
      </div>

      {/* style */}
      <style jsx>{`
        }

        .khung {
          max-width: 700px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .phần_hồ_sơ {
          background: linear-gradient(to bottom, #e6f7ff, #f0f9ff);
          text-align: center;
          padding: 30px 20px 40px;
          position: relative;
        }

        .nút_chỉnh_sửa {
          position: absolute;
          top: 15px;
          right: 15px;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          cursor: pointer;
        }

        .ảnh_đại_diện { width: 140px; height: 140px; margin: 0 auto 20px; position: relative; }
        .cây_cộng { width: 100%; height: 100%; }
        .viền_xanh {
          position: absolute;
          top: -8px; left: -8px; right: -8px; bottom: -8px;
          border: 3px dashed #58cc02;
          border-radius: 50%;
          animation: xoay 10s linear infinite;
        }
        @keyframes xoay { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .tên_người_dùng { font-size: 28px; font-weight: 800; margin-bottom: 6px; }
        .tên_tài_khoản { font-size: 16px; color: #666; margin-bottom: 8px; }
        .ngày_tham_gia { font-size: 15px; color: #777; margin-bottom: 15px; }

        .thống_kê {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
          font-size: 14px;
          color: #555;
        }

        .cờ_mỹ { font-size: 20px; }

        .danh_sách_thống_kê {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 20px;
          background: white;
        }

        .ô_thống_kê {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          font-size: 14px;
        }

        .số_lớn { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
        .màu_vàng { color: #f9c002; }
        .màu_xám { color: #888; }

        .phần_thành_tích { padding: 20px; background: white; }

        .tiêu_đề_thành_tích {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: 700;
        }

        .xem_tất_cả { color: #58cc02; font-size: 15px; font-weight: 600; text-decoration: none; }

        .mục_thành_tích {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon_thành_tích { width: 60px; height: 60px; border-radius: 12px; flex-shrink: 0; }

        .tên_thành_tích { font-weight: 600; margin-bottom: 6px; }
        .mô_tả { font-size: 14px; color: #666; margin-bottom: 8px; }

        .thanh_tiến_độ {
          height: 10px;
          background: #e0e0e0;
          border-radius: 5px;
          overflow: hidden;
        }

        .đã_hoàn_thành { height: 100%; background: #ffb800; border-radius: 5px; }

        .số_tiến_độ { text-align: right; font-size: 14px; color: #555; margin-top: 4px; }
      `}</style>
    </>
  );
}
