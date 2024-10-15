// src/pages/signup.js

import InputField from '../components/InputField';
import Button from '../components/Button';

export default function Signup() {
  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form>
        <InputField label="Email" type="email" placeholder="Enter your email" />
        <InputField label="Password" type="password" placeholder="Enter your password" />
        <InputField label="Confirm Password" type="password" placeholder="Confirm your password" />
        <Button text="Signup" />
      </form>
    </div>
  );
}
