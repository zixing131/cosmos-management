
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
      title='修改质保单'
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
            message: '经销商名称名称为必填项',
          },
        ]}
        width="md"
        name="dealer"
        label="经销商名称"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '车主姓名名称为必填项',
          },
        ]}
        width="md"
        name="owner_name"
        label="车主姓名"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '车主联系电话名称为必填项',
          },
        ]}
        width="md"
        name="phone_number"
        label="车主联系电话"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '车牌号码名称为必填项',
          },
        ]}
        width="md"
        name="license_plate"
        label="车牌号码"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '车辆品牌名称为必填项',
          },
        ]}
        width="md"
        name="car_brand"
        label="车辆品牌"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '产品系列名称为必填项',
          },
        ]}
        width="md"
        name="product_series"
        label="产品系列"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '卷轴编号名称为必填项',
          },
        ]}
        width="md"
        name="coil_number"
        label="卷轴编号"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '施工日期名称为必填项',
          },
        ]}
        width="md"
        name="construction_date"
        label="施工日期"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '质保截止日期名称为必填项',
          },
        ]}
        width="md"
        name="expiration_date"
        label="质保截止日期"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '当前状态名称为必填项',
          },
        ]}
        width="md"
        name="status"
        label="当前状态"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '车辆照片名称为必填项',
          },
        ]}
        width="md"
        name="vehicle_photo"
        label="车辆照片"
      />
      
      <ProFormText
        rules={[
          {
            required: true,
            message: '总报价名称为必填项',
          },
        ]}
        width="md"
        name="total_price"
        label="总报价"
      />
      
    </ModalForm>
  );
};

export default UpdateForm;
