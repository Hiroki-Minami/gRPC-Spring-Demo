'use client';
import Image from "next/image";
import { getToken, isLogin } from "./lib/auth";
import { redirect } from "next/navigation";
import { useState } from "react";
import { getCompletion, promptSchema } from "./lib/completion";
import { useAuth } from "./auth-context";

interface Chat {
  prompt: string
  answer?: string
}

export default function Home() {
  if (!isLogin()) {
    redirect('/login')
  }
  const context = useAuth()
  const [chats, setChats] = useState<Chat[]>([]);
  const [prompt, setPrompt] = useState<string>('')

  const sendPrompt = async () => {
    console.log('send prompt started')
    console.log(prompt)
    const token = getToken()
    if (!token || !context?.isLoggedIn) {
        redirect('/login')
    }

    const newChat: Chat = { prompt }
    console.log(chats)
    setChats(current => [...current, newChat])
    console.log(chats)

    const response = await getCompletion(prompt)
    console.log(response)
    setChats((current) => {
      current[current.length - 1].answer = response
      return current
    })
    setPrompt('')
  }
  // TODO: if not logged in yet redirect to login
  // otherwise stay 
  return (
    <main className="flex flex-col h-screen w-full px-60 py-12 bg-white">
      <div className="overflow-y-auto w-full flex-grow">
        {chats.map((chat, index) => (
          <div key={index} className="flex flex-col w-full">
            <div className="flex w-full justify-start p-6">
              <div className="flex flex-col border-2 rounded-lg bg-orange-200 max-w-[800px] h-fit">
                <p className="text-black p-3">
                  {chat.prompt}
                </p>
              </div>
            </div>
            {chat.answer && (
              <div className="flex w-full justify-end p-6">
                <div className="flex flex-col border-2 rounded-lg bg-lime-300 max-w-[800px] h-fit">
                  <p className="text-black p-3">
                    {chat.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center p-4 gap-3">
          <input
            type="text"
            id="post"
            name="post"
            placeholder="question"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-96 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black text-black"
          />
          <button
            type="button"
            disabled={!prompt}
            onClick={sendPrompt}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
      </div>
    </main>
  );
}
