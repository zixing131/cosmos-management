
import ImageUploadDragger from '@/components/ImageUploadDragger';
import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';

const AddForm = (props) => {
  return (
    <ModalForm
      title='新建案例'
      width="600px"
      visible={props?.addModalVisible}
      onVisibleChange={props?.changeVisible}
      modalProps={{
        destroyOnClose: true,
      }}
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

      <ImageUploadDragger name="image" label="列表首图" width={175} height={98} max={1} />

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

      <ImageUploadDragger name="images" label="案例照片" width={175} height={98} max={20} />

    </ModalForm>
  );
};

export default AddForm;
