
import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
} from '@ant-design/pro-components';

const AddForm = (props) => {
  return (
    <ModalForm
      title='新建微信用户'
      width="400px"
      visible={props?.addModalVisible}
      onVisibleChange={props?.changeVisible}
      onFinish={async (value) => {
        const success = await handleAdd(value);
        if (success) {
          props?.handleModalVisible(false);
          if (props?.actionRef.current) {
            props?.actionRef.current.reload();
          }
        }
      }}
    > 
     
      <ProFormText
        rules={[
          {
            required: true,
            message: '用户ID为必填项',
          },
        ]}
        width="md"
        name="id"
        label="用户ID"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '微信用户唯一标识为必填项',
          },
        ]}
        width="md"
        name="open_id"
        label="微信用户唯一标识"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '用户名为必填项',
          },
        ]}
        width="md"
        name="username"
        label="用户名"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '昵称为必填项',
          },
        ]}
        width="md"
        name="nickname"
        label="昵称"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '密码为必填项',
          },
        ]}
        width="md"
        name="password"
        label="密码"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '邮箱为必填项',
          },
        ]}
        width="md"
        name="email"
        label="邮箱"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '电话为必填项',
          },
        ]}
        width="md"
        name="phone"
        label="电话"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '头像为必填项',
          },
        ]}
        width="md"
        name="avatar"
        label="头像"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '性别为必填项',
          },
        ]}
        width="md"
        name="gender"
        label="性别"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '国家为必填项',
          },
        ]}
        width="md"
        name="country"
        label="国家"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '省份为必填项',
          },
        ]}
        width="md"
        name="province"
        label="省份"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '城市为必填项',
          },
        ]}
        width="md"
        name="city"
        label="城市"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '创建时间为必填项',
          },
        ]}
        width="md"
        name="create_time"
        label="创建时间"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '修改时间为必填项',
          },
        ]}
        width="md"
        name="update_time"
        label="修改时间"
      />
      
    </ModalForm>
  );
};

export default AddForm;
