"use client";
import { useState } from "react";
import Head from "next/head";

export default function Auth() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showDetails, setShowDetails] = useState(false);
  const [age, setAge] = useState<number | "">("");

  const handleNext = () => {
    if (age === "" || age < 13) {
      alert("Bạn phải từ 13 tuổi trở lên để đăng ký Duolingo!");
      return;
    }
    setShowDetails(true);
  };

  return (
    <>
      <Head>
        <title>Đăng nhập / Đăng ký</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="hộp_chính">
        <div className="nút_đóng" onClick={() => window.close()}>
          &times;
        </div>

        <div className="thanh_chuyển">
          <button
            className={`nút_tab ${tab === "login" ? "đang_chọn" : ""}`}
            onClick={() => setTab("login")}
          >
            ĐĂNG NHẬP
          </button>
          <button
            className={`nút_tab ${tab === "register" ? "đang_chọn" : ""}`}
            onClick={() => setTab("register")}
          >
            ĐĂNG KÝ
          </button>
        </div>

        {/* FORM ĐĂNG NHẬP */}
        {tab === "login" && (
          <div className="form">
            <h1 className="tiêu_đề">Đăng nhập</h1>
            <div className="nhóm_input">
              <input
                type="text"
                className="ô_nhập"
                placeholder="Email hoặc tên đăng nhập"
              />
            </div>
            <div className="nhóm_input">
              <input
                type="password"
                className="ô_nhập"
                placeholder="Mật khẩu"
              />
              <a
                href="#"
                style={{
                  float: "right",
                  fontSize: "14px",
                  color: "#58cc02",
                  marginTop: "5px",
                  display: "block",
                }}
              >
                Quên?
              </a>
            </div>
            <button className="nút_xanh">ĐĂNG NHẬP</button>

            <div className="đường_kẻ">
              <span>HOẶC</span>
            </div>

            <div className="đăng_nhập_mạng_xã_hội">
              <div className="nút_mạng_xã_hội">
                <img
                  src="https://duolingo.com/images/google-logo.svg"
                  width="20"
                />
                GOOGLE
              </div>
              <div className="nút_mạng_xã_hội">
                <img
                  src="https://duolingo.com/images/facebook-logo.svg"
                  width="20"
                />
                FACEBOOK
              </div>
            </div>

            <div className="chú_thích">
              Khi đăng nhập trên Duolingo, bạn đã đồng ý với{" "}
              <a href="#">Các chính sách và Chính sách bảo mật</a> của chúng
              tôi.
              <br />
              <br />
              Trang này được reCAPTCHA Enterprise bảo vệ và tuân theo{" "}
              <a href="#">Chính sách bảo mật</a> và{" "}
              <a href="#">Điều khoản dịch vụ</a> của Google.
            </div>
          </div>
        )}

        {/* FORM ĐĂNG KÝ */}
        {tab === "register" && (
          <div className="form">
            {!showDetails && (
              <>
                <h1 className="tiêu_đề">Bạn bao nhiêu tuổi?</h1>
                <div className="nhóm_input">
                  <input
                    type="number"
                    className="ô_nhập"
                    placeholder="Tuổi"
                    min={13}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                </div>
                <button className="nút_xanh nút_xám" onClick={handleNext}>
                  TIẾP THEO
                </button>
              </>
            )}

            {showDetails && (
              <div id="phần_chi_tiết" style={{ marginTop: 20 }}>
                <h1 className="tiêu_đề">Tạo hồ sơ</h1>
                <div className="nhóm_input">
                  <input type="text" className="ô_nhập" placeholder="Tên (tùy chọn)" />
                </div>
                <div className="nhóm_input">
                  <input type="email" className="ô_nhập" placeholder="Email" />
                </div>
                <div className="nhóm_input">
                  <input type="password" className="ô_nhập" placeholder="Mật khẩu" />
                </div>
                <button className="nút_xanh">TẠO TÀI KHOẢN</button>
              </div>
            )}

            <div className="đường_kẻ">
              <span>HOẶC</span>
            </div>

            <div className="đăng_nhập_mạng_xã_hội">
              <div className="nút_mạng_xã_hội">
                <img
                  src="https://duolingo.com/images/google-logo.svg"
                  width="20"
                />
                GOOGLE
              </div>
              <div className="nút_mạng_xã_hội">
                <img
                  src="https://duolingo.com/images/facebook-logo.svg"
                  width="20"
                />
                FACEBOOK
              </div>
            </div>

            <div className="chú_thích">
              Khi đăng ký trên Duolingo, bạn đã đồng ý với{" "}
              <a href="#">Các chính sách và Chính sách bảo mật</a> của chúng tôi.
              <br />
              <br />
              Trang này được reCAPTCHA Enterprise bảo vệ và tuân theo{" "}
              <a href="#">Chính sách bảo mật</a> và{" "}
              <a href="#">Điều khoản dịch vụ</a> của Google.
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: "Inter", Arial, sans-serif;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .hộp_chính {
          width: 420px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          position: relative;
        }

        .nút_đóng {
          position: absolute;
          top: 15px;
          right: 15px;
          font-size: 28px;
          cursor: pointer;
          color: #aaa;
        }

        .thanh_chuyển {
          display: flex;
          background: #f5f5f5;
        }

        .nút_tab {
          flex: 1;
          padding: 18px;
          border: none;
          background: none;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }
        .nút_tab.đang_chọn {
          background: white;
          border-bottom: 4px solid #58cc02;
          color: #58cc02;
        }

        .tiêu_đề {
          text-align: center;
          padding: 30px 40px 10px;
          font-size: 28px;
          font-weight: 700;
        }

        .form {
          padding: 0 40px 30px;
        }

        .nhóm_input {
          margin-bottom: 16px;
        }
        .ô_nhập {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
        }
        .ô_nhập:focus {
          outline: none;
          border-color: #58cc02;
          box-shadow: 0 0 0 4px rgba(88, 204, 2, 0.15);
        }

        .nút_xanh {
          width: 100%;
          padding: 15px;
          background: #58cc02;
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
        }
        .nút_xanh:hover {
          background: #4ab302;
        }
        .nút_xám {
          background: #eee !important;
          color: #777 !important;
        }

        .đường_kẻ {
          text-align: center;
          margin: 25px 0;
          position: relative;
          color: #888;
          font-size: 14px;
        }
        .đường_kẻ::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #ddd;
        }
        .đường_kẻ span {
          background: white;
          padding: 0 20px;
        }

        .đăng_nhập_mạng_xã_hội {
          display: flex;
          gap: 12px;
        }
        .nút_mạng_xã_hội {
          flex: 1;
          padding: 13px;
          border: 1.5px solid #ddd;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .chú_thích {
          font-size: 12px;
          color: #666;
          text-align: center;
          margin-top: 25px;
          line-height: 1.6;
        }
        .chú_thích a {
          color: #58cc02;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
