// src/pages/login.js

import InputField from '../components/InputField';
import Button from '../components/Button';

export default function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <InputField label="Email" type="email" placeholder="Enter your email" />
        <InputField label="Password" type="password" placeholder="Enter your password" />
        <Button text="Login" />
      </form>
    </div>
  );
}
