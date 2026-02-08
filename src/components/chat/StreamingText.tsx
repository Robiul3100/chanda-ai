import { useState, useEffect } from "react";

interface StreamingTextProps {
  content: string;
  isStreaming: boolean;
  onComplete?: () => void;
}

const StreamingText = ({ content, isStreaming, onComplete }: StreamingTextProps) => {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(!isStreaming);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedWords(content.split(/(\s+)/));
      setIsComplete(true);
      return;
    }

    const words = content.split(/(\s+)/);
    let currentIndex = 0;
    setDisplayedWords([]);
    setIsComplete(false);

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedWords((prev) => [...prev, words[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [content, isStreaming, onComplete]);

  if (isComplete || !isStreaming) {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }

  return (
    <span className="whitespace-pre-wrap">
      {displayedWords.map((word, index) => (
        <span
          key={index}
          className="animate-word-reveal inline"
          style={{ animationDelay: `${index * 10}ms` }}
        >
          {word}
        </span>
      ))}
      <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse-soft align-middle" />
    </span>
  );
};

export default StreamingText;
