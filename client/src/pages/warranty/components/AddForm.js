
import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormDigit,
  ProFormUploadDragger,
  ProFormDatePicker,
} from '@ant-design/pro-components';
import { Row, Form } from 'antd';

const AddForm = (props) => {
  const [form] = Form.useForm();

  return (
    <ModalForm
      title='新建质保单'
      width="600px"
      form={form}
      autoFocusFirstInput
      visible={props?.addModalVisible}
      onVisibleChange={props?.changeVisible}
      onFinish={async (value) => {
        await props.onSubmit({
          ...value,
          vehicle_photo: value?.vehicle_photo[0]?.response?.data?.url || ''
        })
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '经销商名称为必填项',
          },
        ]}
        width="xl"
        name="dealer"
        label="经销商名称"
      />

      <ProFormText
        rules={[
          {
            required: true,
            message: '车主姓名为必填项',
          },
        ]}
        width="xl"
        name="owner_name"
        label="车主姓名"
      />

      <ProFormText
        rules={[
          {
            required: true,
            message: '车主联系电话为必填项',
          },
        ]}
        width="xl"
        name="phone_number"
        label="车主联系电话"
      />

      <ProFormText
        rules={[
          {
            required: true,
            message: '车牌号码为必填项',
          },
        ]}
        width="xl"
        name="license_plate"
        label="车牌号码"
      />

      <ProFormText
        rules={[
          {
            required: true,
            message: '车辆品牌为必填项',
          },
        ]}
        width="xl"
        name="car_brand"
        label="车辆品牌"
      />

      <ProFormText
        rules={[
          {
            required: true,
            message: '产品系列为必填项',
          },
        ]}
        width="xl"
        name="product_series"
        label="产品系列"
      />

      <ProFormText
        rules={[
          {
            required: true,
            message: '卷轴编号为必填项',
          },
        ]}
        width="xl"
        name="coil_number"
        label="卷轴编号"
      />

      <ProFormDatePicker
        rules={[
          {
            required: true,
            message: '施工日期为必填项',
          },
        ]}
        width="xl"
        name="construction_date"
        label="施工日期"
      />

      <ProFormDatePicker
        rules={[
          {
            required: true,
            message: '质保截止日期为必填项',
          },
        ]}
        width="xl"
        name="expiration_date"
        label="质保截止日期"
      />

      {/* <ProFormText
        rules={[
          {
            required: true,
            message: '当前状态为必填项',
          },
        ]}
        request={async () => [
          { label: '全部', value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
          { label: '解决中', value: 'processing' },
        ]}
        width="xl"
        name="status"
        label="当前状态"
      /> */}

      <ProFormUploadDragger
        rules={[
          {
            required: true,
            message: '车辆照片为必填项',
          },
        ]}
        max={1}
        width="xl"
        name="vehicle_photo"
        label="车辆照片"
        action={'/api/upload'}
        accept=".png, .jpg, .jpeg, .gif, .bmp,.webp"
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
        }}
      />

      <ProFormDigit
        rules={[
          {
            required: true,
            message: '总报价为必填项',
          },
        ]}
        width="xl"
        name="total_price"
        label="总报价"
      />

      <ProFormText
        width="xl"
        name="id"
        label="唯一标识，主键"
        hidden
      />

    </ModalForm>
  );
};

export default AddForm;
