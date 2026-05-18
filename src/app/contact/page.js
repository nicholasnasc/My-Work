"use client";

import { useEffect, useRef, useState } from "react";
import {
  CloudIcon,
  FlameIcon,
  UserIcon,
  RocketIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  MailIcon,
  ArrowRightIcon,
  SendIcon,
} from "lucide-react";
import Link from "next/link";

import { Dock, DockIcon } from "@/components/magicui/dock";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import MiniMusicPlayer from "@/components/MiniMusicPlayer";

const INITIAL_MESSAGES = [
  {
    from: "me",
    text: "Hey! 👋 Drop me a message and I'll get back to you soon.",
  },
];

export default function Contact() {
  useScrollRestoration();

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || sent) return;

    setLoading(true);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: message, meta: `${name} · ${email}` },
    ]);
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setSent(true);
        setName("");
        setEmail("");
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { from: "me", text: "Got it! I'll get back to you soon 🙌" },
          ]);
        }, 700);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "me", text: "Hmm, something went wrong. Try again?" },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "me", text: "Hmm, something went wrong. Try again?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Background Clouds */}
      <div className="absolute top-20 right-20">
        <CloudIcon className="w-32 h-32 text-gray-200" />
      </div>
      <div className="absolute bottom-40 left-20">
        <CloudIcon className="w-24 h-24 text-gray-200" />
      </div>
      <div className="absolute top-1/2 right-1/4">
        <CloudIcon className="w-40 h-40 text-gray-200" />
      </div>
      <div className="absolute bottom-20 right-32">
        <CloudIcon className="w-36 h-36 text-gray-200" />
      </div>
      <div className="absolute top-40 left-1/4">
        <CloudIcon className="w-28 h-28 text-gray-200" />
      </div>
      <div className="absolute top-60 right-60">
        <CloudIcon className="w-20 h-20 text-gray-200" />
      </div>

      {/* Header */}
      <div className="flex justify-center w-full pt-6 px-4 sm:px-0">
        <div className="w-full sm:w-[80%] border border-black rounded-lg bg-white/50 backdrop-blur-sm">
          <header className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6">
            <div
              className="text-xl sm:text-2xl font-black uppercase mb-2 sm:mb-0"
              style={{ fontFamily: "var(--font-dela-gothic)" }}
            >
              Connect
            </div>
            <div className="flex items-center gap-2">
              <MiniMusicPlayer />
              <Link
                href="/"
                className="hover:opacity-80 transition-opacity p-2"
              >
                <FlameIcon className="w-6 h-6" />
              </Link>
            </div>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <main className="grid grid-cols-1 px-6 sm:px-12 md:px-24 lg:px-32 min-h-[80vh] relative py-10 sm:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.9] mb-12 sm:mb-16">
            Parley
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Left side - Chat */}
            <div className="bg-white/50 backdrop-blur-sm border border-black rounded-lg flex flex-col h-[520px] sm:h-[560px]">
              {/* Chat header */}
              <div className="p-4 border-b border-black flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-bold leading-none">Nicholas</p>
                  <p className="text-xs text-gray-500">Online · replies within 24h</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                        msg.from === "user"
                          ? "bg-black text-white rounded-br-sm"
                          : "bg-gray-100 border border-gray-200 rounded-bl-sm"
                      }`}
                    >
                      {msg.from === "user" && msg.meta && (
                        <p className="text-xs text-gray-400 mb-1">{msg.meta}</p>
                      )}
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-black space-y-2"
              >
                {!sent && (
                  <div className="flex gap-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Name"
                      className="flex-1 px-3 py-2 text-sm bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black min-w-0"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                      className="flex-1 px-3 py-2 text-sm bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black min-w-0"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={sent}
                    placeholder={sent ? "Message sent!" : "Type a message..."}
                    className="flex-1 px-3 py-2 text-sm bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={loading || sent}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center"
                  >
                    <SendIcon className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right side - Social links */}
            <div className="space-y-8">
              <div
                className="japanese-text text-2xl sm:text-3xl mb-8"
                data-meaning="'Connections open new doors.'"
              >
                「繋がりが
                <br />
                新しい扉を
                <br />
                開きます。」
              </div>

              <div className="space-y-6">
                {/* GitHub */}
                <a
                  href="https://github.com/nicholasnasc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <GithubIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">GitHub</h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-300">
                      @nicholasnasc
                    </p>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/nickzin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <LinkedinIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">LinkedIn</h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-300">
                      @nickzin
                    </p>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Gmail */}
                <a
                  href="mailto:nickolaspessoalnasc@gmail.com"
                  className="flex items-center gap-4 p-4 border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <MailIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Email</h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-300">
                      nickolaspessoalnasc@gmail.com
                    </p>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/nicholas_nasc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <InstagramIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Instagram</h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-300">
                      @nicholas_nasc
                    </p>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
              <br/>
                <h1>Software Engineer | Full-Stack | DevOps | Cloud </h1>
              <br/>
        </div>

              <br/>


      </main>

      {/* Dock at the bottom */}
      <div className="fixed bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-50">
        <Dock className="scale-75 sm:scale-100">
          <Link href="/">
            <DockIcon>
              <FlameIcon className="h-5 w-5" />
            </DockIcon>
          </Link>
          <Link href="/about">
            <DockIcon>
              <UserIcon className="h-5 w-5" />
            </DockIcon>
          </Link>
          <Link href="/projects">
            <DockIcon>
              <RocketIcon className="h-5 w-5" />
            </DockIcon>
          </Link>
          <Link href="/contact">
            <DockIcon isActive={true}>
              <CloudIcon className="h-5 w-5" />
            </DockIcon>
          </Link>
        </Dock>
      </div>
    </div>
  );
}
