import React from 'react';
import { Spin, Alert, Layout } from 'antd';
const AntLoader = () => {
  return (
    <div style={{ margin: '100px auto' }}>
      <Spin tip='Loading...'>
        <Alert
          message='Alert message title'
          description='Further details about the context of this alert.'
          type='info'
        />
      </Spin>
    </div>
  );
};

export default AntLoader;
