import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createProduct } from '../actions/productActions.js';
import NumberFormat from 'react-number-format';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { IMAGE_ADD_IMAGE_RESET } from '../constants/imageConstants';
import { createImage } from '../actions/imageAction.js';
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
  Modal,
} from 'antd';
import 'antd/dist/antd.css';

import ImgCrop from 'antd-img-crop';

import API from '../api';
import { listCategories } from '../actions/categoryActions.js';

const { Content } = Layout;
const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const AntAdminProductAdd = ({ history, match }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const imageCreate = useSelector((state) => state.imageCreate);
  const {
    loading: loadingCreateImage,
    success: successCreateImage,
    error: errorCreateImage,
    images,
  } = imageCreate;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreateProduct,
    success: successCreateProduct,
    error: errorCreateProduct,
    product: ressultProduct,
  } = productCreate;
  const [product, setProduct] = useState({});
  const [imageRessult, setImageRessult] = useState({});
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (successCreateImage === true) {
      var list = [];

      Array.from(images.data.url).forEach((image) => {
        // console.log('rul', image);
        list.push({ url: image });
        // setImageRessult(...imageRessult, { url: image });
      });

      product.images = list;
      console.log('rul', product);

      dispatch(createProduct(product));
      // console.log('____xxxxxxxxxxx', product);
      dispatch({ type: IMAGE_ADD_IMAGE_RESET });
    } else if (successCreateImage === false) {
      message.warning('This is a warning message: ' + errorCreateImage);
    }
  }, [successCreateImage]);

  useEffect(() => {
    if (successCreateProduct === true) {
      message.success('Added product name: ' + ressultProduct.name);

      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push('/admin/products');
    } else if (successCreateProduct === false) {
      message.warning('This is a warning message: ' + errorCreateProduct);
    }
  }, [successCreateProduct]);

  console.log(categories);

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

  const onFinish = (values) => {
    // values.product.images = imageList;
    // console.log(values);

    if (fileList.length === 0) {
      message.warning('Please add image');
    } else {
      const fmData = new FormData();

      setProduct(values.product);

      Array.from(fileList).forEach((image) => {
        console.log(image);
        fmData.append('files', image.originFileObj);
      });

      dispatch(createImage(fmData));
    }
  };

  const [fileList, setFileList] = useState([]);

  const [file, setFile] = useState();

  const [imageList, setImageList] = useState([]);

  function onChangePrice(value) {
    console.log('changed', value);
  }

  ///

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [progress, setProgress] = useState(0);

  const onPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  ///
  const onChange = ({ fileList: newFileList, file: newFile }) => {
    console.log(newFile);
    const isJPG = newFile.type === 'image/jpeg' || newFile.type === 'image/png';
    const isLt2M = newFile.size / 1024 / 1024 < 2;

    if (!isJPG || !isLt2M) {
    } else {
      setFileList(newFileList);
      setFile(newFile);
    }
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const config = {
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    try {
      onSuccess('Ok');
    } catch (err) {
      console.log('Eroor: ', err);
      const error = new Error('Some error');
      onError({ err });
    }
  };

  const handleupload = (file, fileList) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return false;
    }
    if (!isJPG) {
      message.error('You can only upload JPG or PNG file!');

      return false;
    } else {
      console.log('file', file, 'fileList', fileList);
      return true;
    }
  };

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
        <Breadcrumb.Item>Add</Breadcrumb.Item>
      </Breadcrumb>

      <Form
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}
        wrapperCol={{ sm: 24 }}
        style={{ width: '80%', marginRight: 0 }}
        fields={[
          {
            name: ['product', 'price'],
            value: 10000,
          },
          {
            name: ['product', 'quantity'],
            value: 100,
          },
        ]}>
        <Form.Item
          name={['product', 'name']}
          label='Name'
          rules={[
            { required: true },
            { min: 10, message: 'Name must be minimum 10 characters.' },
            { max: 100, message: 'Name must be maximum 100 characters.' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{ sm: 24 }}
          name={['product', 'price']}
          label='Price'
          rules={[{ type: 'number' }, { required: true }]}>
          <InputNumber
            min={10000}
            step={5000}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            onChange={onChangePrice}
          />
        </Form.Item>
        <Form.Item
          name={['product', 'quantity']}
          label='Quantity'
          rules={[{ type: 'number', min: 0, max: 1000 }, { required: true }]}>
          <InputNumber />
          {/* <NumberFormat
            thousandSeparator={true}
            prefix={'$'}
            className='some'
            inputmode='numeric'
          /> */}
        </Form.Item>

        <Form.Item
          name={['product', 'description']}
          label='Description'
          rules={[
            { required: true },
            { min: 10, message: 'Description must be minimum 10 characters.' },
            {
              max: 100,
              message: 'Description must be maximum 100 characters.',
            },
          ]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name={['product', 'categoryId']}
          label='Category'
          rules={[{ required: true }]}>
          <Select
            placeholder='Search to Select'
            style={{ width: 240 }}
            showSearch
            // onChange={handleProvinceChange}
            optionFilterProp='children'
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }>
            {categories.map((category) => (
              <Option key={category.categoryId}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label='Image'
          // rules={[{ required: true }]}
        >
          <Upload
            customRequest={uploadImage}
            listType='picture-card'
            file={file}
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            accept='image/*'
            beforeUpload={handleupload}>
            {fileList.length < 5 && '+ Upload'}
          </Upload>

          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}>
            <img alt='example' style={{ width: '100%' }} src={previewImage} />
          </Modal>
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

export default AntAdminProductAdd;
