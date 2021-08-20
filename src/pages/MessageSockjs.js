import React, { useRef, useState } from 'react';
import SockJsClient from 'react-stomp';
import { useSelector } from 'react-redux';
import { Comment, Avatar, Form, List, Affix } from 'antd';
import moment from 'moment';
import UserInfo from './UserInfo';
import 'react-chat-elements/dist/main.css';

import { MessageBox } from 'react-chat-elements';
import { ChatItem } from 'react-chat-elements';
import { MessageList } from 'react-chat-elements';
import { SideBar } from 'react-chat-elements';
import { Navbar } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements';


const MessageSockjs = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const refSockJs = useRef(null);
  const inputRef = useRef();
  const [messages, setMessages] = useState([]);

  const handleOnConnect = () => {
    console.log('connect');
  };

  const handleSubmit = () => {
    console.log('submit', value);
    if (!value) {
      return;
    }

    // refSockJs.current.sendMessage(
    //   '/app/hello',
    //   JSON.stringify(`${userInfo.phone}_${value}`)
    // );
    let message = {
      name: `${userInfo.id}`,
      message: `${value}`,
      urlImage: [],
      date: new Date(),
    };
    refSockJs.current.sendMessage(
      `/app/sendMessageToAdmin/${userInfo.id}`,

      JSON.stringify(message)
    );
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onMessageR = (content) => {
    console.log('okeR', content);
    // setSubmitting(true);

    // const authorRe = content.split('_')[0];
    // const contentRe = content.replace(authorRe + '_', '');
    // // console.log('oke', getContent(content));
    setTimeout(() => {
      console.log(value);
      inputRef.current.clear();
      setMessages([
        ...messages,
        {
          position: 'right',
          type: 'text',
          text: content.message,
          date: Date.parse(content.date),
          data: {
            uri: 'https://firebasestorage.googleapis.com/v0/b/nas-app-77.appspot.com/o/01d55bcc-5c36-4add-a258-28aef5052d28jpg?alt=media',
          },
        },
      ]);
    }, 10);
  };

  const onMessageL = (content) => {
    console.log('okeL', content);
    setTimeout(() => {
      console.log(value);
      inputRef.current.clear();
      setMessages([
        ...messages,
        {
          position: 'left',
          type: 'text',
          text: content.message,
          date: Date.parse(content.date),
          data: {
            uri: 'https://firebasestorage.googleapis.com/v0/b/nas-app-77.appspot.com/o/01d55bcc-5c36-4add-a258-28aef5052d28jpg?alt=media',
          },
        },
      ]);
    }, 10);
  };
  return (
    <div>
      <div style={{ height: '500px' }}>
        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={messages}
        />
      </div>

      <Input
        ref={inputRef}
        placeholder='Type here...'
        multiline={false}
        onChange={handleChange}
        rightButtons={
          <Button
            color='white'
            backgroundColor='black'
            text='Send'
            onClick={handleSubmit}
          />
        }
      />

      <SockJsClient
        ref={refSockJs}
        url='https://webhook-dialog-flow-spring-boo.herokuapp.com/gs-guide-websocket'
        topics={[`/topic/reciveMessage/${userInfo.id}`]}
        onMessage={(msg) => {
          onMessageL(msg);
        }}
        onConnect={handleOnConnect}
      />

      <SockJsClient
        ref={refSockJs}
        url='https://webhook-dialog-flow-spring-boo.herokuapp.com/gs-guide-websocket'
        topics={[`/topic/reciveMySelftMessageToAdmin/${userInfo.id}`]}
        onMessage={(msg) => {
          onMessageR(msg);
        }}
        onConnect={handleOnConnect}
      />
    </div>
  );
};

export default MessageSockjs;
