// src/components/InputField.js

export default function InputField({ label, type, placeholder }) {
    return (
      <div className="input-field">
        <label>{label}</label>
        <input type={type} placeholder={placeholder} required />
      </div>
    );
  }
  