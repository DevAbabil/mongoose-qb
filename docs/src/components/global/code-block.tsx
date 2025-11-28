"use client";

import { useEffect, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDidComponentMount } from "@/hooks/use-did-component-mount";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock = ({ code, language = "typescript", title }: CodeBlockProps) => {
  const mounted = useDidComponentMount();
  const { isCopied, copy } = useCopyToClipboard();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    const darkMode = document.documentElement.classList.contains("dark");
    setIsDark(darkMode);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) {
    return <div className="rounded-lg border border-border bg-muted p-4">Loading...</div>;
  }

  return (
    <Highlight
      theme={isDark ? themes.nightOwl : themes.nightOwlLight}
      code={code.trim()}
      language={language as any}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="not-prose rounded-lg border border-border overflow-hidden">
          {title && (
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 bg-muted/50">
              <span className="text-xs font-semibold text-muted-foreground">{title}</span>
            </div>
          )}
          <div className="flex items-start justify-between overflow-hidden">
            <pre
              className={`${className} flex-1 overflow-x-auto p-4 text-sm leading-relaxed`}
              style={style}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line });
                return (
                  <div key={i} {...lineProps}>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token });
                      return <span key={key} {...tokenProps} />;
                    })}
                  </div>
                );
              })}
            </pre>
            <div className="shrink-0 border-l border-border/50 p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copy(code)}
                aria-label={`Copy ${language} code`}
                className="h-7 w-7 p-0"
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Highlight>
  );
};

export default CodeBlock;
