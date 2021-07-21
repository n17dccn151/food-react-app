import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createProduct } from '../actions/productActions.js';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import {
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Form,
  Input,
  InputNumber,
  Upload,
  Select,
  message,
  Progress,
} from 'antd';
import 'antd/dist/antd.css';

import ImgCrop from 'antd-img-crop';
import { createImage } from '../actions/imageAction';
import API from '../api';
import { listCategories } from '../actions/categoryActions.js';

const { Content } = Layout;
const { Option } = Select;

const AntAdminCategoryAdd = ({ history, match }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const { userInfo } = user;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = (values: any) => {
    values.category.images = imageList;
    console.log(values);
  };

  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);

  const [file, setFile] = useState();

  const [imageList, setImageList] = useState([]);

  const onChange = ({ fileList: newFileList, file: newFile }) => {
    setFileList(newFileList);
    setFile(newFile);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const [progress, setProgress] = useState(0);
  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('files', file);
    try {
      const res = await API.post(`uploads`, fmData, config);

      onSuccess('Ok');
      console.log('server res: ', res.data.data);
      const updateImageList = [...imageList, res.data.data];
      setImageList(updateImageList);
    } catch (err) {
      console.log('Eroor: ', err);
      const error = new Error('Some error');
      onError({ err });
    }
  };

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>

      <Form
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}
        wrapperCol={{ sm: 24 }}
        style={{ width: '80%', marginRight: 0 }}>
        <Form.Item
          name={['category', 'name']}
          label='Name'
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name={['category', 'description']}
          label='Description'
          rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label='Image'
          // rules={[{ required: true }]}
        >
          <ImgCrop rotate>
            <Upload
              customRequest={uploadImage}
              listType='picture-card'
              file={file}
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              accept='image/*'
              beforeUpload={(file) => {
                const isJPG =
                  file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJPG) {
                  message.error('You can only upload JPG or PNG file!');
                  return false;
                } else {
                  return true;
                }
              }}>
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 14 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default AntAdminCategoryAdd;
