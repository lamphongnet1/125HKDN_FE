"use client";
import { useState } from "react";
import Head from "next/head";
import { registerUser, loginUser } from "./services/userService";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showDetails, setShowDetails] = useState(false);
  const [age, setAge] = useState<number | "">("");

  const router = useRouter();

  // signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupDiem, setSignupDiem] = useState<number | undefined>(undefined);
  const [signupSoGioOnline, setSignupSoGioOnline] = useState<number | undefined>(undefined);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState<string | null>(null);

  // login state
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleNext = () => {
    if (age === "" || age < 13) {
      alert("Bạn phải từ 13 tuổi trở lên để đăng ký Duolingo!");
      return;
    }
    setShowDetails(true);
  };

  const handleRegister = async () => {
    setSignupMessage(null);
    if (!signupEmail || !signupPassword) {
      setSignupMessage('Vui lòng nhập email và mật khẩu');
      return;
    }

    setSignupLoading(true);
    try {
      const payload = {
        name: signupName || undefined,
        email: signupEmail.trim(),
        password: signupPassword,
      };

      const json = await registerUser(payload as any);
      // API đăng ký thành công sẽ trả về user object
      if (json && (json.user || json.message === 'User created successfully' || json.success)) {
        setSignupMessage('Đăng ký thành công!');
        // Refresh lại trang sau 1.5 giây
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setSignupMessage(json?.message || 'Đăng ký thất bại');
      }
    } catch (err: any) {
      setSignupMessage(err?.message || 'Lỗi khi đăng ký');
    } finally {
      setSignupLoading(false);
    }
  };

  const fillAndRegisterDemo = async () => {
    // The user-provided demo data
    const demo = {
      HoTen: 'Nguyễn Bảo',
      Email: 'vanbao@example.com',
      MatKhau: 'password123',
      Diem: 9600,
      SoGioOnline: 5,
    };

    // prefill fields
    setAge(20);
    setShowDetails(true);
    setSignupName(demo.HoTen);
    setSignupEmail(demo.Email);
    setSignupPassword(demo.MatKhau);
    setSignupDiem(demo.Diem);
    setSignupSoGioOnline(demo.SoGioOnline);

    // try register and then login (if not already logged in)
    setSignupLoading(true);
    try {
      await handleRegister();
      // attempt login with same credentials
      setLoginId(demo.Email);
      setLoginPassword(demo.MatKhau);
      await new Promise((r) => setTimeout(r, 300));
      await handleLogin();
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoginMessage(null);
    if (!loginId || !loginPassword) {
      setLoginMessage('Vui lòng nhập email và mật khẩu');
      return;
    }

    setLoginLoading(true);
    try {
      const json = await loginUser(loginId.trim(), loginPassword);
      // API chỉ trả về { user: {...} }, không có token
      if (json && json.user) {
        // Lưu toàn bộ user object
        localStorage.setItem('user', JSON.stringify(json.user));
        // Lưu ID_User riêng để dễ truy cập
        if (json.user.ID_User !== undefined && json.user.ID_User !== null) {
          localStorage.setItem('ID_User', String(json.user.ID_User));
        }
        setLoginMessage('Đăng nhập thành công');
        // Chuyển về trang /learn
        setTimeout(() => router.push('/learn'), 700);
      } else {
        setLoginMessage(json?.message || 'Đăng nhập thất bại');
      }
    } catch (err: any) {
      setLoginMessage(err?.message || 'Lỗi khi đăng nhập');
    } finally {
      setLoginLoading(false);
    }
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
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </div>
            <div className="nhóm_input">
              <input
                type="password"
                className="ô_nhập"
                placeholder="Mật khẩu"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            {loginMessage && <div className="form-message">{loginMessage}</div>}
            <button className="nút_xanh" onClick={handleLogin} disabled={loginLoading}>{loginLoading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}</button>

            <div className="đường_kẻ">
              <span>HOẶC</span>
            </div>

            <div className="đăng_nhập_mạng_xã_hội">
              <div className="nút_mạng_xã_hội">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  width="20"
                  alt="Google"
                />
                GOOGLE
              </div>
              <div className="nút_mạng_xã_hội">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  width="20"
                  alt="Facebook"
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
            <h1 className="tiêu_đề">Đăng ký</h1>
            <div className="nhóm_input">
              <input type="text" className="ô_nhập" placeholder="Tên" value={signupName} onChange={(e) => setSignupName(e.target.value)} />
            </div>
            <div className="nhóm_input">
              <input type="email" className="ô_nhập" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
            </div>
            <div className="nhóm_input">
              <input type="password" className="ô_nhập" placeholder="Mật khẩu" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
            </div>
            {signupMessage && <div className="form-message">{signupMessage}</div>}
            <button className="nút_xanh" onClick={handleRegister} disabled={signupLoading}>
              {signupLoading ? "Đang tạo..." : "TẠO TÀI KHOẢN"}
            </button>
          </div>
        )}
      </div>

      {/* CSS GLOBAL: Cần thiết để body có đủ chiều cao cho việc căn giữa */}
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%; 
        }
      `}</style>

      <style jsx>{`
        * { box-sizing: border-box; }
        html, body { height: 100%; }
        body {
          font-family: "Inter", Arial, sans-serif;
          background: linear-gradient(180deg, #f6fbf1 0%, #ffffff 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 36px 16px;
        }

        .hộp_chính {
          margin-top: 50px;
          margin-right: auto;
          margin-bottom: auto;
          margin-left: auto;
          width: 420px;
          max-width: 100%;
          background: linear-gradient(180deg,#ffffff 0%, #fbfff7 100%);
          border-radius: 14px;
          box-shadow: 0 12px 30px rgba(6, 10, 15, 0.08), 0 6px 10px rgba(6, 10, 15, 0.04);
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(88,204,2,0.06);
          transition: transform 160ms ease, box-shadow 160ms ease;
        }
        .hộp_chính:hover { transform: translateY(-6px); }

        .thanh_chuyển {
          display: flex;
          gap: 8px;
          padding: 12px;
          align-items: center;
          background: transparent;
        }

        .nút_tab {
          flex: 1;
          padding: 12px 14px;
          border: none;
          background: transparent;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          color: #4b5563;
          border-radius: 10px;
          transition: background 140ms, color 140ms;
        }
        .nút_tab:hover { background: rgba(15,23,42,0.03); }
        .nút_tab.đang_chọn {
          color: #236100;
          background: rgba(88,204,2,0.08);
          box-shadow: inset 0 -4px 0 #58cc02;
        }

        .tiêu_đề {
          text-align: center;
          padding: 20px 40px 8px;
          font-size: 26px;
          font-weight: 800;
          color: #0b1220;
        }

        .form { padding: 6px 40px 30px; animation: fadeIn 220ms ease; }

        .nhóm_input { margin-bottom: 16px; }
        .ô_nhập {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          font-size: 15px;
          background: #fff;
          transition: box-shadow 140ms, border-color 140ms;
        }
        .ô_nhập:focus {
          outline: none;
          border-color: #58cc02;
          box-shadow: 0 8px 26px rgba(88,204,2,0.06);
        }

        .quen-link { float: right; font-size: 14px; color: #58cc02; margin-top: 6px; display: block; text-decoration: none; }
        .quen-link:hover { text-decoration: underline; }

        .nút_xanh {
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg,#58cc02,#3fb000);
          color: white;
          border: none;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 10px;
          box-shadow: 0 8px 22px rgba(64,123,0,0.12);
transition: transform 120ms, box-shadow 120ms;
        }
        .nút_xanh:hover { transform: translateY(-2px); }
        .nút_xám { background: #f3f4f6 !important; color: #6b7280 !important; pointer-events: none; }

        .đường_kẻ { text-align: center; margin: 24px 0; position: relative; color: #9ca3af; font-size: 13px; }
        .đường_kẻ::before { content: ""; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #eee; }
        .đường_kẻ span { background: transparent; padding: 0 12px; position: relative; color: #6b7280; }

        .đăng_nhập_mạng_xã_hội { display: flex; gap: 12px; }
        .nút_mạng_xã_hội {
          flex: 1;
          padding: 12px;
          border: 1px solid #eef2f7;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 120ms, border-color 120ms, transform 120ms;
        }
        .nút_mạng_xã_hội:hover { background: #fbfbfb; transform: translateY(-2px); }
        .nút_mạng_xã_hội img { width: 18px; height: 18px; object-fit: contain; margin-right: 8px; }

        .phần_chi_tiết { margin-top: 20px; }

        .form-message { color: #166534; font-weight: 600; text-align:center; margin-bottom: 8px; }
        .secondary-button { width: 100%; padding: 12px; border-radius: 10px; margin-top: 8px; background: #f3f4f6; color: #374151; border: none; cursor: pointer; }
        .secondary-button:disabled { opacity: 0.6; pointer-events: none; }
        .chú_thích { font-size: 13px; color: #6b7280; text-align: center; margin-top: 24px; line-height: 1.6; }
        .chú_thích a { color: #58cc02; text-decoration: none; }
        .chú_thích a:hover { text-decoration: underline; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: none; } }

        @media (max-width: 480px) {
          .hộp_chính { width: 92%; border-radius: 12px; }
          .tiêu_đề { font-size: 22px; }
          .form { padding-left: 20px; padding-right: 20px; }
        }
      `}</style>
    </>
  );
}