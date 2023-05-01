import { renderWidget } from "@remnote/plugin-sdk";
import React, { useState } from "react";
import Message from "./Message";
import '../style.css';
import '../App.css';

interface IMessage {
  text: string;
  isUser: boolean;
}

function MyWidget() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const sendMessage = (text: string): void => {
    const newMessages = [...messages, { text, isUser: true }];
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { text: `Here is some python code:

~~~python
for i in range(1, 11):
    sum += i
~~~
`, isUser: false},
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-nord0">
      <div className="flex-1 overflow-y-scroll">
        {messages.map((message, index) => (
          <div className="clearfix" key={index}>
            <Message isUser={message.isUser} text={message.text} />
          </div>
        ))}
      </div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement & {
            reset: () => void;
            message: { value: string };
          };
          sendMessage(target.message.value);
          target.reset();
        }}
        className="p-4 flex text-nord6 mb-20"
      >
        <input
          type="text"
          name="message"
          className="shadow flex-1 rounded-lg p-2 mr-2 bg-nord3 text-nord6 focus:outline-none focus:ring-2 focus:ring-nord4"
          placeholder="Type your message here"
        />
        <button
          type="submit"
          className="bg-nord10 px-4 py-2 rounded-lg text-nord6 hover:bg-nord9 focus:outline-none focus:ring-2 focus:ring-nord4"
        >
          Send
        </button>
      </form>
    </div>
  );
}

renderWidget(MyWidget);