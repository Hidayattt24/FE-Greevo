"use client";

import React, { useState, useRef, useEffect } from "react";
import { MobilePageLayout } from "@/components";
import {
  predefinedQuestions,
  botResponses,
  defaultResponse,
} from "@/data/chatbot";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi, jika ada kebingungan mari chat dengan kami 🌱",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Cek respons yang sudah didefinisikan
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Respons untuk kata kunci umum
    if (lowerMessage.includes("plastik")) {
      return "Plastik merupakan salah satu material yang bisa didaur ulang! Pastikan Anda memilah plastik berdasarkan kode daur ulang dan membersihkannya sebelum dibuang. Apakah ada jenis plastik tertentu yang ingin Anda tanyakan?";
    }

    if (lowerMessage.includes("sampah") || lowerMessage.includes("limbah")) {
      return "Pengelolaan sampah yang baik dimulai dari rumah. Prinsip 3R (Reduce, Reuse, Recycle) sangat penting. Apakah Anda ingin tahu lebih detail tentang cara memilah sampah?";
    }

    if (lowerMessage.includes("kompos")) {
      return "Kompos adalah cara terbaik mengolah sampah organik! Dengan kompos, Anda bisa mengurangi sampah hingga 40% dan menghasilkan pupuk alami. Mau tau cara membuatnya?";
    }

    if (lowerMessage.includes("lingkungan")) {
      return "Menjaga lingkungan adalah tanggung jawab kita bersama! Mulai dari hal kecil seperti memilah sampah, menggunakan tas belanja sendiri, dan mengurangi penggunaan plastik sekali pakai. Ada hal spesifik yang ingin Anda lakukan untuk lingkungan?";
    }

    if (
      lowerMessage.includes("halo") ||
      lowerMessage.includes("hai") ||
      lowerMessage.includes("hello")
    ) {
      return "Halo juga! Senang bisa membantu Anda. Saya bisa menjawab pertanyaan tentang pengelolaan sampah, daur ulang, dan tips ramah lingkungan. Silakan tanyakan apa saja! 😊";
    }

    // Respons default
    return defaultResponse;
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Tambah pesan user
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulasi delay bot typing
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay 1-3 detik
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <MobilePageLayout>
      <div
        className="flex flex-col h-[calc(100vh-140px)]"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-center py-6 px-4 bg-white">
          <h1 className="text-xl font-semibold" style={{ color: "#213813" }}>
            Greevo Chat
          </h1>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.isUser ? "text-white" : "bg-gray-100 text-gray-800"
                }`}
                style={{
                  backgroundColor: message.isUser ? "#213813" : undefined,
                }}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.isUser ? "text-green-100" : "text-gray-500"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: "#213813" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "#213813",
                      animationDelay: "0.1s",
                    }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "#213813",
                      animationDelay: "0.2s",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="p-4">
            <p className="text-sm mb-3" style={{ color: "#606060" }}>
              Pertanyaan yang sering ditanyakan:
            </p>
            <div className="space-y-2">
              {predefinedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left p-3 text-white rounded-lg border-none hover:opacity-90 transition-colors text-sm"
                  style={{ backgroundColor: "#213813" }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputText);
                  }
                }}
                placeholder="Ketik pertanyaan Anda..."
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:border-transparent focus:ring-[#213813] text-[#213813] placeholder-[#213813]"
                disabled={isTyping}
              />
            </div>
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isTyping}
              className="w-12 h-12 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              style={{
                backgroundColor:
                  !inputText.trim() || isTyping ? "#9CA3AF" : "#213813",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </MobilePageLayout>
  );
}
