
import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
} from '@ant-design/pro-components';
const UpdateForm = (props) => {
  return (
    <ModalForm
      title='修改案例'
      width="400px"
      visible={props?.createModalVisible}
      onVisibleChange={props?.handleModalVisible}
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
            message: '名称为必填项',
          },
        ]}
        width="md"
        name="brand"
        label=""
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '名称为必填项',
          },
        ]}
        width="md"
        name="series"
        label=""
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '名称为必填项',
          },
        ]}
        width="md"
        name="product_name"
        label=""
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '名称为必填项',
          },
        ]}
        width="md"
        name="create_time"
        label=""
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '名称为必填项',
          },
        ]}
        width="md"
        name="update_time"
        label=""
      />
      
    </ModalForm>
  );
};

export default UpdateForm;
