// src/components/Button.js

import '../styles/button.css';

export default function Button({ text }) {
  return <button className="custom-button" type="submit">{text}</button>;
}
