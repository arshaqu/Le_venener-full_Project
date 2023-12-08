import React, { useEffect, useRef, useState } from 'react'
import {userRequest} from "./../../axios"
import axios from 'axios'

import socket  from '../../socket/socket'
import { message } from 'antd'





function Chat() {
  const [chatData, setChatData] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [inputdata, setInputData] = useState("");
  const [lastReadIndex, setLastReadIndex] = useState(-1); // Track the last read message index

  const getData = async () => {
    try {
      userRequest({
        url: "/api/user/chats",
        method: "post",
        data: {},
      }).then((res) => {
        console.log("responded", res.data);
        console.log(res.data.messages);
        setChatData(res.data.messages);
        setAdminId(res.data.adminId);
        console.log(res.data.userId);
        socket.emit("setup", res.data.userId);

        socket.emit("join", res.data.connection._id);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();

    userRequest({
      url: "/api/user/submitmsg",
      method: "post",
      data: { inputdata, adminId },
    }).then((res) => {
      socket.emit("chatMessage", res.data.data);
      setChatData((p) => [...p, res.data.data]);
      setInputData("");
    });
  };

  useEffect(() => {
    getData();
    socket.on("msgDone", (message) => {
      console.log(message, "message");
      setChatData((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const chatContainerRef = useRef(null);
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    // Update last read index when scrolling to the bottom
    setLastReadIndex(chatData.length - 1);
  }, [chatData]);

  const handleKeyDown = (e) => {
    if (e && e.key === "Enter") {
      e.preventDefault();
      submitMessage();
    }
  };

  return (
    <div>
      <div class="flex h-screen antialiased text-gray-800">
        <div class="flex flex-row h-full w-full overflow-x-hidden">
          <div class="flex flex-col flex-auto h-full p-6">
            <div
              class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
            >
              <div ref={chatContainerRef} class="flex flex-col h-full overflow-x-auto mb-4">
                <div class="flex flex-col h-full">
                  <div class="grid grid-cols-12 gap-y-2">
                    {chatData?.map((item, i) => (
                      <div key={i} class={`col-start-1 col-end-13 p-3 rounded-lg ${i > lastReadIndex ? 'bg-yellow-100' : ''}`}>
                        {/* Added background color for unread messages */}
                        <div class={item?.fromId === adminId ? "flex flex-row items-center" : "flex items-center justify-start flex-row-reverse"}>
                          <div
                            class={`flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 ${
                              item?.fromId === adminId ? 'text-white' : 'text-gray-600'
                            }`}
                          >
                            A
                          </div>
                          <div
                            class={`relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl ${
                              item?.fromId === adminId ? 'text-gray-800' : 'text-gray-600'
                            }`}
                          >
                            <div>{item?.message}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          <div
            class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
          >
            <div>
              <button
                class="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="flex-grow ml-4">
              <div class="relative w-full">
               
              <input
  type="text"
  value={inputdata}
  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
  onChange={(e) => {
    setInputData(e.target.value);
  }}
  onKeyDown={(e) => handleKeyDown(e)}
/>

                <button 
                  class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="ml-4">
              <button onClick={submitMessage}
                class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span class="ml-2">
                  <svg
                    class="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Chat
