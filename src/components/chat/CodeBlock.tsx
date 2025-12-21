import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    
    if (success) {
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Code copied to clipboard',
      });
      
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({
        title: 'Failed to copy',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="relative group my-3 rounded-lg overflow-hidden bg-code">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border/50">
        <span className="text-xs font-mono text-muted-foreground uppercase">
          {language || 'code'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-xs gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-primary" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>

      {/* Code content */}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-code-foreground leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
};
