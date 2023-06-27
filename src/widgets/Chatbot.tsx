import { renderWidget, ReactRNPlugin, useTracker } from "@remnote/plugin-sdk";
import React, { useState } from "react";
import Message from "./Message";
import "../style.css";
import "../App.css";

interface IMessage {
  content: string;
  role: string;
}

function MyWidget() {
  const apiKey = useTracker(
    async (reactivePlugin) => await reactivePlugin.settings.getSetting("apiKey"),
    []
  );

  const [messages, setMessages] = useState<IMessage[]>([
    { content: "You are RemnoteGPT, an AI designed to help write notes and create flashcards", role: "system" },
  ]);

  const sendMessage = async (text: string) => {
    if (text.length < 1) {
      return;
    }

    const userMessage: IMessage = { content: text, role: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: [...newMessages], // Include the full conversation history
          model: "gpt-3.5-turbo",
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Add the message to the conversation
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: data.choices[0].message.content, role: "assistant" },
        ]);
      } else {
        console.error(response);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-nord0">
      <div className="flex-1 overflow-y-scroll">
        {messages.map((message, index) => (
          <div className="clearfix" key={index}>
            <Message message={message} />
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
