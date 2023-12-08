import React, { useEffect, useRef, useState } from 'react';
import { userRequest } from '../../axios';
import axios from 'axios';
import socket from '../../socket/socket';
import user from '../../assets/user_icon_149329.png';

const AdminChat = () => {
  const [inputData, setInputData] = useState('');
  const [chatList, setChatList] = useState([]);
  const [userId, setUserId] = useState('');
  const [chatData, setChatData] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  // const [unreadMessages, setUnreadMessages] = useState([]);
const [selectedUserId, setSelectedUserId] = useState('');

console.log(unreadMessages);


const selectUser = async (id) => {
  setSelectedUserId(id);
  await axios.post('/api/admin/getchatdata', { userId: id }).then((res) => {
    setUserId(id)
    setChatData(res.data.messages);
    socket.emit('setup', res.data.adminId);
    socket.emit('join', res.data.connection._id);
    // Mark all messages as read when selecting a user
    setUnreadMessages([]);
  });
};





useEffect(() => {
  getConnection();
  socket.on('msgDone', (message) => {
    console.log(message, 'done');
    setChatData((prevMessages) => [...prevMessages, message]);
    // Add the received message to unread messages if it's not from the selected user
    if (message.fromId !== selectedUserId) {
      setUnreadMessages((prevUnread) => [...prevUnread, message]);
    }
  });
}, [chatData]);




  const chatContainerRef = useRef(null);
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    // Update last read index when scrolling to the bottom
    setUnreadMessages([]);
  }, [chatData]);

  const submitMessage = (e) => {
    try {
      e.preventDefault();
      userRequest({
        url: '/api/admin/submit',
        method: 'post',
        data: { inputData, userId },
      }).then((res) => {
        setChatData((p) => [...p, res.data.data]);
        socket.emit('chatMessage', res.data.data);
        setInputData('');
        document.getElementById('chatmsg').value = ' ';
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getConnection = async () => {
    await axios.get('/api/admin/connections').then((res) => {
      console.log(res.data.data);
      setChatList(res.data.data);
    });
  };

  // const selectUser = async (id) => {
  //   setUserId(id);
  //   console.log('ok');
  //   await axios.post('/api/admin/getchatdata', { userId: id }).then((res) => {
  //     setChatData(res.data.messages);
  //     console.log(res.data.adminId, 'kk');
  //     socket.emit('setup', res.data.adminId);
  //     socket.emit('join', res.data.connection._id);
  //     // Mark all messages as read when selecting a user
  //     setUnreadMessages([]);
  //   });
  // };

  return (
    <div>
      <div ref={chatContainerRef} class="container mt-2 mx-auto shadow-lg rounded-lg">
        <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div class="font-semibold text-2xl">GoingChat</div>
        </div>
        <div class="flex flex-row justify-between bg-white">
          <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
            {chatList.map((item, index) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  selectUser(item.userId._id);
                }}
                class="flex flex-row py-4 px-2 items-center border-b-2"
              >
                <div class="w-1/4 ">
                  <img style={{width:'50px'}} src={user} class="object-cover h-12 w-12 rounded-full" alt="" />
                </div>
                <div style={{fontFamily:'cursive' ,fontSize:'14px'}} class="w-full">
                  <div style={{fontFamily:'cursive'}}  class="text-lg font-semibold">{item?.userId?.name.toUpperCase()} </div>
                  <span class="text-gray-500">{item?.userId?.phone}</span>
                  {/* Display unread message indicator */}
                  {unreadMessages.some((msg) => msg.fromId === item.userId._id) && (
                    <span class="text-red-500">New Message</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div class="w-full px-5 flex flex-col justify-between">
            <div class="flex flex-col mt-5">
              {chatData?.map((item, index) =>
                item?.fromId === userId ? (
                  <div key={index} className="flex justify-start mb-1">
                    <div style={{width:''}}
                      className="ml-1 py-1 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                      {item?.message}
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex justify-end ">
                    <div
                      className="mr-1 py-1 mb-1 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                      {item?.message}
                    </div>
                  </div>
                )
              )}
            </div>
            <div class="flex flex-row items-center h-16 rounded-xl mt-4 bg-white w-full px-4">
              <div>
                <button
                  class="flex items-center justify-center text-gray-400 hover:text-gray-600"
                ></button>
              </div>
              <div class="flex-grow ml-3">
                <div class="relative w-full">
                  <input
                    style={{ width: '100%', height: '60px' }}
                    type="text"
                    id="chatmsg"
                    class="flex mb-5 w-full border rounded-xl bg-gray-400 focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    value={inputData}
                    onChange={(e) => {
                      setInputData(e.target.value);
                    }}
                  />
                  <button
                    class="absolute mb-5 flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                  ></button>
                </div>
              </div>
              <div class="ml-4">
                <button
                  onClick={submitMessage}
                  style={{ height: '60px', width: '120px' }}
                  class="flex items-center mb-5  justify-center bg-gray-400 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span className="font-bold">Send</span>
                  <span class="ml-2"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
 