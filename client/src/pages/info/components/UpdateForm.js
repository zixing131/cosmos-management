
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
      title='修改静态内容'
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
            message: '唯一标识，主键名称为必填项',
          },
        ]}
        width="md"
        name="id"
        label="唯一标识，主键"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '记录的键名称为必填项',
          },
        ]}
        width="md"
        name="key"
        label="记录的键"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '记录的类型名称为必填项',
          },
        ]}
        width="md"
        name="type"
        label="记录的类型"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '存储实际内容名称为必填项',
          },
        ]}
        width="md"
        name="content"
        label="存储实际内容"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '用于排序的字段名称为必填项',
          },
        ]}
        width="md"
        name="sort_order"
        label="用于排序的字段"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '记录创建的时间名称为必填项',
          },
        ]}
        width="md"
        name="create_time"
        label="记录创建的时间"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '记录最后更新的时间名称为必填项',
          },
        ]}
        width="md"
        name="update_time"
        label="记录最后更新的时间"
      />
      
    </ModalForm>
  );
};

export default UpdateForm;
