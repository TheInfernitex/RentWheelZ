// src/components/Button.js

import '../styles/button.css';  // Import the button styles

export default function Button({ text }) {
  return <button className="custom-button" type="submit">{text}</button>;
}
