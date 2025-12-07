import React, { useState } from "react";
import { signUpWithEmail } from "../services/authService";

const Register: React.FC<{onClose?: ()=>void}> = ({onClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!email || !password) { setMessage("Vui lòng nhập email & mật khẩu."); return; }
    const res = await signUpWithEmail(email, password);
    setMessage(res.message ?? "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");

    if (res.success) {
      setEmail(""); setPassword("");
      setTimeout(()=> { setMessage(""); onClose && onClose(); }, 5000);
    } else {

      setTimeout(()=> setMessage(""), 3000);
    }
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",margin:"8px 0",padding:8}} />
      <input placeholder="Mật khẩu" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"100%",margin:"8px 0",padding:8}} />
      <button onClick={handleRegister} style={{width:"100%",padding:10}}>Đăng ký</button>
      {message && <p style={{marginTop:10}}>{message}</p>}
    </div>
  );
};

export default Register;
