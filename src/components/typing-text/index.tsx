import React, { useEffect, useState } from "react";
const textArray = ["Start filling the form to see the results"];
const TypingEffect: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;
    let cursorInterval: NodeJS.Timeout;

    const typeWriter = () => {
      if (currentText !== textArray[textIndex]) {
        setCurrentText((prev) =>
          textArray[textIndex].substring(0, prev.length + 1)
        );
      } else {
        clearInterval(typingInterval);
        setShowCursor(false);
        setTimeout(() => {
          setShowCursor(true);
          eraseText();
        }, 3000);
      }
    };

    const eraseText = () => {
      if (currentText.length > 0) {
        setCurrentText((prev) =>
          prev.substring(0, prev.length - (textArray[0].length - 5))
        );
      } else {
        setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        typingInterval = setInterval(typeWriter, 100);
      }
    };

    // Initial call
    typingInterval = setInterval(typeWriter, 150);
    cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Cleanup
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [currentText, textIndex]);

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>
        {currentText.toUpperCase()}
        {showCursor && <span>|</span>}
      </h1>
    </div>
  );
};

export default TypingEffect;
