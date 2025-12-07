import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSetPassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMsg("Đổi mật khẩu thất bại!");
      return;
    }

    setMsg("Đổi mật khẩu thành công!");
  };

  return (
    <div>
      <h2>Đặt lại mật khẩu</h2>

      <input
        type="password"
        placeholder="Mật khẩu mới"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSetPassword}>Đổi mật khẩu</button>

      {msg && <p>{msg}</p>}
    </div>
  );
};

export default ResetPassword;
