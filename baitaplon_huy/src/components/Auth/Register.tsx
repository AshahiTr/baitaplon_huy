import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { register } from '../../redux/authSlice';
import './Auth.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await dispatch(register({
        ...formData,
        role: 'reader',
        quota: 5,
        currentBorrowing: 0,
        penaltyStatus: '',
      })).unwrap();
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng Ký</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Đăng ký thành công! Đang chuyển hướng...</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Đăng ký</button>
        </form>
        <div className="auth-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
