
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
      title='修改案例图片'
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
            message: 'ID名称为必填项',
          },
        ]}
        width="md"
        name="id"
        label="ID"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '关联案例名称为必填项',
          },
        ]}
        width="md"
        name="case_id"
        label="关联案例"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '图片地址名称为必填项',
          },
        ]}
        width="md"
        name="image_url"
        label="图片地址"
      />
      
    </ModalForm>
  );
};

export default UpdateForm;
