import React, {useState} from "react";
import '../style.css';
import '../App.css';
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {nord} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface IMessage {
  text: string;
  isUser: boolean;
}

function Message({ isUser, text }: IMessage) {
  return (
    <div
      className={
      `${
        isUser ? "bg-nord2" : "bg-nord1"
      } text-nord6 p-3 h-15 max-w-full border border-nord3`
    }
    >
      <div  className="py-1 flex" >
        <img className="w-5 rounded-full" src={isUser ? 'https://lh3.googleusercontent.com/a-/AOh14Gi1YtbUC4-SyrwcjaVsrhGECgBxG2iCPhJXlOlu=s96-c' : "https://seeklogo.com/images/C/chatgpt-logo-02AFA704B5-seeklogo.com.png"} alt=""></img>
        <p className="text-sm pl-2 text-nord6">{isUser ? "Will Barouch" : "GPTCopilot"}</p>
      </div>
      <ReactMarkdown
        children={text}
        components={{
          code({node, inline, className, children, ...props}) {
            const [copied, setCopied] = useState(false);

            const handleCopy = () => {
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            };

            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="relative">
                <CopyToClipboard text={String(children).trim()} onCopy={handleCopy}>
                  <button
                    className="absolute top-2 right-2 rounded-md bg-nord0"
                    aria-label="Copy code to clipboard"
                  >
                    {copied ? (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                    )}
                  </button>
                </CopyToClipboard>
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={nord}
                  language={match[1]}
                  PreTag="div"
                />

              </div>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          }
        }}
      />
    </div>
  );
}

export default Message;