import React, { useRef, useState } from 'react';
import SockJsClient from 'react-stomp';
import { useSelector } from 'react-redux';
import { Comment, Avatar, Form, Button, List, Input, Affix } from 'antd';
import moment from 'moment';
import UserInfo from '../pages/UserInfo';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout='horizontal'
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType='submit'
        loading={submitting}
        onClick={onSubmit}
        type='primary'>
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const SampleComponent = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const refSockJs = useRef(null);

  const handleOnConnect = () => {
    console.log('connect');
  };

  const handleButonClick = () => {};

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    refSockJs.current.sendMessage(
      '/app/hello',
      JSON.stringify(`${userInfo.phone}_${value}`)
    );
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const getContent = (content) => {
    let index = content.indexOf('_');
    let newString = content.substring(index, content.length());
    return newString;
  };

  const onMessage = (content) => {
    setSubmitting(true);

    const authorRe = content.split('_')[0];
    const contentRe = content.replace(authorRe + '_', '');
    // console.log('oke', getContent(content));
    setTimeout(() => {
      setValue('');
      setSubmitting(false);
      setComments([
        ...comments,
        {
          author: authorRe,
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <p>{contentRe}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 10);
  };

  return (
    <div>
      <div style={({ height: '200px' }, { margin: '100px' })}>
        {comments.length > 0 && <CommentList comments={comments} />}
      </div>

      <Affix offsetTop={400}>
        <Comment
          avatar={
            <Avatar
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              alt='Han Solo'
            />
          }
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </Affix>
      <SockJsClient
        ref={refSockJs}
        url='http://localhost:8080/gs-guide-websocket'
        topics={['/topic/greetings']}
        onMessage={(msg) => {
          onMessage(msg.content);
        }}
        onConnect={handleOnConnect}
      />
    </div>
  );
};

export default SampleComponent;
