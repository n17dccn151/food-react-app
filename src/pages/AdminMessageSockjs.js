import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';
import { Comment, Avatar, Form, List, Affix } from 'antd';
import moment from 'moment';
import { MessageList } from 'react-chat-elements';
import UserInfo from './UserInfo';
import 'react-chat-elements/dist/main.css';
import { Button } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { ChatList } from 'react-chat-elements';
import { Row, Col } from 'antd';
import '../App.css';
import { listUsers } from '../actions/userActions.js';
import AntLoader from '../components/AntLoading.js';
import AntError from '../components/AntError.js';
const AdminMessageSockjs = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const refSockJs = useRef(null);
  const inputRef = useRef();
  const [messages, setMessages] = useState([]);
  const [chatList, setChatList] = useState([]);
  var chatListA = [];
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;
  const [userIdSe, setUserIdSe] = useState('');

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log('connect', users);
    if (loadingUsers === false) {
      users.map((item) => {
        chatListA.push({
          avatar: 'https://facebook.github.io/react/img/logo.svg',
          alt: 'Reactjs',
          title: `${item.phone}`,
          // subtitle: 'What are you doing?',
          date: new Date(),
          unread: 0,
          key: `${item.userId}`,
        });
      });
      setChatList(chatListA);
    }
  }, [loadingUsers]);

  const handleOnConnect = () => {
    console.log('connect');
  };

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    let message = {
      name: `${userInfo.id}`,
      message: `${value}`,
      urlImage: [],
      date: new Date(),
    };
    refSockJs.current.sendMessage(
      `/app/sendMessage/${userIdSe}`,

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
      console.log(inputRef);
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
    // style={({ height: '200px' }, { overflowY: 'auto' })}

    loadingUsers ? (
      <AntLoader />
    ) : error ? (
      <AntError />
    ) : (
      <div className='chat'>
        <Row>
          <Col span={18} push={6}>
            <div>
              <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={messages}
              />
            </div>

            <div className='input-chat'>
              <div>
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
              </div>
            </div>
          </Col>
          <Col span={6} pull={18}>
            <div>
              <ChatList
                className='chat-list'
                dataSource={chatList}
                onClick={(e) => {
                  setUserIdSe(e.key);
                  console.log(e.key);
                }}
              />
            </div>
          </Col>
        </Row>

        <SockJsClient
          ref={refSockJs}
          url='https://webhook-dialog-flow-spring-boo.herokuapp.com/gs-guide-websocket'
          topics={['/topic/reciveMessage']}
          onMessage={(msg) => {
            onMessageL(msg);
          }}
          onConnect={handleOnConnect}
        />

        <SockJsClient
          ref={refSockJs}
          url='https://webhook-dialog-flow-spring-boo.herokuapp.com/gs-guide-websocket'
          topics={[`/topic/reciveMySelftMessage/${userIdSe}`]}
          onMessage={(msg) => {
            onMessageR(msg);
          }}
          onConnect={handleOnConnect}
        />
      </div>
    )
  );
};

export default AdminMessageSockjs;
