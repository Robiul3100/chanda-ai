import { useState, useEffect } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

interface StreamingTextProps {
  content: string;
  isStreaming: boolean;
  onComplete?: () => void;
}

const StreamingText = ({ content, isStreaming, onComplete }: StreamingTextProps) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isComplete, setIsComplete] = useState(!isStreaming);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedContent(content);
      setIsComplete(true);
      return;
    }

    const chars = content.split("");
    let currentIndex = 0;
    setDisplayedContent("");
    setIsComplete(false);

    const interval = setInterval(() => {
      // Reveal multiple characters at a time for speed
      const chunkSize = 3;
      if (currentIndex < chars.length) {
        const nextChunk = chars.slice(currentIndex, currentIndex + chunkSize).join("");
        setDisplayedContent((prev) => prev + nextChunk);
        currentIndex += chunkSize;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, 15);

    return () => clearInterval(interval);
  }, [content, isStreaming, onComplete]);

  if (isComplete || !isStreaming) {
    return <MarkdownRenderer content={content} />;
  }

  return (
    <div>
      <MarkdownRenderer content={displayedContent} />
      <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse-soft align-middle rounded-full" />
    </div>
  );
};

export default StreamingText;
