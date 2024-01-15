
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
      title='新建管理后台账号'
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
            message: '唯一标识为必填项',
          },
        ]}
        width="md"
        name="id"
        label="唯一标识"
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
            message: '电子邮件为必填项',
          },
        ]}
        width="md"
        name="email"
        label="电子邮件"
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
            message: '更新时间为必填项',
          },
        ]}
        width="md"
        name="update_time"
        label="更新时间"
      />
      
    </ModalForm>
  );
};

export default AddForm;
