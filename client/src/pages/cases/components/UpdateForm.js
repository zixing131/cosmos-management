import { useEffect, useRef } from 'react';
import ImageUploadDragger from '@/components/ImageUploadDragger';

import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
} from '@ant-design/pro-components';

const UpdateForm = (props) => {
  const formRef = useRef();

  // useEffect(() => {
  //   if (props?.updateModalVisible) {
  //     debugger
  //     formRef?.current?.setFieldsValue({
  //       id: props?.values?.id,
  //       brand: props?.values?.brand,
  //       series: props?.values?.series,
  //       image: [{ uid: '-1', url: props?.values?.image }],
  //       product_name: props?.values?.product_name,
  //       images: props?.values?.images?.map((item, index) => {
  //         return {
  //           uid: index,
  //           url: item,
  //         };
  //       }),
  //     });
  //   }
  // }, [props?.updateModalVisible])

  console.log('UpdateForm', props)
  
  return (
    <ModalForm
      title='修改案例'
      initialValues={{
        id: props?.values?.id,
        brand: props?.values?.brand,
        series: props?.values?.series,
        image: [{ uid: '-1', url: props?.values?.image }],
        product_name: props?.values?.product_name,
        images: props?.values?.case_images?.map((item, index) => {
          return {
            uid: index,
            url: item?.image_url || '',
          };
        }),
      }}
      width="600px"
      visible={props?.updateModalVisible}
      onVisibleChange={props?.changeVisible}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (value) => {
        await props?.onSubmit({
          ...value,
          image: value?.image[0]?.response?.data?.url || '',
          images: value?.images?.map((item) => item?.response?.data?.url) || [],
        })
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '名称为必填项',
          },
        ]}
        width="md"
        name="id"
        label=""
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '为必填项',
          },
        ]}
        width="md"
        name="brand"
        label="品牌/型号"
      />

      <ProFormText
        rules={[
          {
            required: true,
            message: '为必填项',
          },
        ]}
        width="md"
        name="series"
        label="系列"
      />

      <ImageUploadDragger name="image" label="列表首图" width={120} height={100} max={1} />

      <ProFormText
        rules={[
          {
            required: true,
            message: '为必填项',
          },
        ]}
        width="md"
        name="product_name"
        label="产品名称"
      />

      <ImageUploadDragger name="images" label="案例照片" max={20} />
    </ModalForm>
  );
};

export default UpdateForm;
