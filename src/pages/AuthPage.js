import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate
import styles from '../styles/AuthPage.module.css';

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false); // Состояние для показа/скрытия пароля
  const [email, setEmail] = useState(''); // Состояние для email
  const [password, setPassword] = useState(''); // Состояние для пароля
  const navigate = useNavigate(); // Навигация для перенаправления

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Переключение состояния для показа/скрытия пароля
  };

  const handleLogin = () => {
    // Здесь можно добавить логику валидации или проверки
    navigate('/projects'); // Перенаправление на страницу проектов
  };

  return (
    <div className={styles.authContainer}>
      {/* Иконка (например, для выхода) */}
      <div className={styles.iconContainer}>
        <img 
          src="/images/Your App.svg" 
          alt="Exit" 
          className={styles.exitIcon} 
        />
      </div>

      {/* Контейнер с содержимым */}
      <div className={styles.authContent}>
        <p className={styles.welcomeText}>Добро пожаловать</p>
        <p className={styles.subheadingText}>Войдите в систему, чтобы продолжить</p>

        {/* Инпут для email */}
        <input
          type="email"
          placeholder="Email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Инпут для пароля с глазиком */}
        <div className={styles.passwordInputContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            className={styles.inputField1}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src="/images/eye.svg"
            alt="Показать/Скрыть пароль"
            className={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          />
        </div>

        {/* Кнопка "Войти" */}
        <button className={styles.button} onClick={handleLogin}>
          Войти
        </button>

        {/* Ссылка "Забыли пароль?" */}
        <div className={styles.forgotPassword}>
          <span>Забыли пароль? </span>
          <a href="/restore-password" className={styles.restoreLink}>Восстановить</a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
