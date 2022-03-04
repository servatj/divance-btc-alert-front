import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Load languages dynamically so the least prism packages are imported at first.
const langLoader = (language) => {
  dynamic(() =>
    import(`react-syntax-highlighter/dist/cjs/languages/prism/${language}`).then((mod) => {
      SyntaxHighlighter.registerLanguage('jsx', mod);
      return mod;
    })
  );
};

const CodeBlock = ({ children }) => {
  const language = 'jsx'

  useEffect(() => {
    // Load each language from the code tag in MDX format. If repeated it will just be invoked without extra load.
    langLoader(language);
  }, [language]);

  const code = children.trim();

  return (
     <>
        <SyntaxHighlighter language={language} style={tomorrow}>
          {code}
        </SyntaxHighlighter>
     </>
  );
};


export default CodeBlock;
