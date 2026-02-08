import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "";
  const code = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3 rounded-xl overflow-hidden border border-border/50">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/80 border-b border-border/50">
        <span className="text-[11px] font-mono text-muted-foreground font-display">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-primary" />
              <span>কপি হয়েছে</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>কপি</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-secondary/40 text-sm">
        <code className="text-foreground font-mono">{code}</code>
      </pre>
    </div>
  );
};

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-bold text-foreground mt-4 mb-2 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-bold text-foreground mt-3 mb-1.5 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-semibold text-foreground mt-2.5 mb-1 first:mt-0">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-foreground/90">{children}</em>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-2 space-y-1 ml-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-2 space-y-1 ml-1">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed text-card-foreground">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-3 border-primary/40 pl-3 py-0.5 my-2 text-muted-foreground italic">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
          >
            {children}
          </a>
        ),
        code: ({ className, children, ...props }) => {
          const isBlock = className?.startsWith("language-") || String(children).includes("\n");
          if (isBlock) {
            return <CodeBlock className={className}>{children}</CodeBlock>;
          }
          return (
            <code className="px-1.5 py-0.5 rounded-md bg-secondary text-foreground text-[13px] font-mono" {...props}>
              {children}
            </code>
          );
        },
        pre: ({ children }) => <>{children}</>,
        hr: () => <hr className="my-4 border-border/50" />,
        table: ({ children }) => (
          <div className="overflow-x-auto my-3 rounded-xl border border-border/50">
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-secondary/60">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-border/50">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3 py-2 border-b border-border/30">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
