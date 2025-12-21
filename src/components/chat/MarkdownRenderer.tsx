import React from 'react';
import { CodeBlock } from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parse content into blocks
  const parseContent = (text: string) => {
    const blocks: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        blocks.push({
          type: 'text',
          content: text.slice(lastIndex, match.index),
        });
      }

      // Add code block
      blocks.push({
        type: 'code',
        language: match[1] || undefined,
        content: match[2].trim(),
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      blocks.push({
        type: 'text',
        content: text.slice(lastIndex),
      });
    }

    return blocks;
  };

  // Render inline markdown elements
  const renderInlineMarkdown = (text: string): React.ReactNode => {
    // Split by inline code first
    const parts = text.split(/(`[^`]+`)/g);

    return parts.map((part, index) => {
      // Inline code
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code 
            key={index} 
            className="px-1.5 py-0.5 rounded bg-code text-code-foreground font-mono text-[0.875em]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Process other inline elements
      let processed: React.ReactNode = part;

      // Bold (**text**)
      processed = replaceWithReact(
        part,
        /\*\*([^*]+)\*\*/g,
        (match, p1, key) => <strong key={key} className="font-semibold">{p1}</strong>
      );

      return <React.Fragment key={index}>{processed}</React.Fragment>;
    });
  };

  // Helper to replace regex matches with React elements
  const replaceWithReact = (
    text: string,
    regex: RegExp,
    replacer: (match: string, p1: string, key: number) => React.ReactNode
  ): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let keyCounter = 0;

    const localRegex = new RegExp(regex.source, 'g');
    while ((match = localRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(replacer(match[0], match[1], keyCounter++));
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  // Render text blocks with paragraph handling
  const renderTextBlock = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let orderedListItems: string[] = [];
    let currentParagraph = '';

    const flushParagraph = () => {
      if (currentParagraph.trim()) {
        elements.push(
          <p key={`p-${elements.length}`} className="leading-relaxed">
            {renderInlineMarkdown(currentParagraph.trim())}
          </p>
        );
        currentParagraph = '';
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2">
            {listItems.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const flushOrderedList = () => {
      if (orderedListItems.length > 0) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-1 my-2">
            {orderedListItems.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ol>
        );
        orderedListItems = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Empty line = paragraph break
      if (trimmedLine === '') {
        flushParagraph();
        flushList();
        flushOrderedList();
        return;
      }

      // Unordered list item (- or *)
      if (/^[-*]\s/.test(trimmedLine)) {
        flushParagraph();
        flushOrderedList();
        listItems.push(trimmedLine.replace(/^[-*]\s/, ''));
        return;
      }

      // Ordered list item (1. 2. etc)
      if (/^\d+\.\s/.test(trimmedLine)) {
        flushParagraph();
        flushList();
        orderedListItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
        return;
      }

      // Regular text - add to paragraph
      flushList();
      flushOrderedList();
      currentParagraph += (currentParagraph ? ' ' : '') + line;
    });

    // Flush remaining content
    flushParagraph();
    flushList();
    flushOrderedList();

    return elements;
  };

  const blocks = parseContent(content);

  return (
    <div className="prose prose-sm max-w-none space-y-2">
      {blocks.map((block, index) => {
        if (block.type === 'code') {
          return (
            <CodeBlock 
              key={index} 
              code={block.content} 
              language={block.language} 
            />
          );
        }
        return (
          <React.Fragment key={index}>
            {renderTextBlock(block.content)}
          </React.Fragment>
        );
      })}
    </div>
  );
};
