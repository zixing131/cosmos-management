/**
 * template config
 * @param directory client/src/pages/<%= identity %>/components
 */

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
      title='新建<%= name %>'
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
     {% for name, field, comment in model.fields %}
      <ProFormText
        rules={[
          {
            required: true,
            message: '<%= model.fields[name].comment %>为必填项',
          },
        ]}
        width="md"
        name="<%= name %>"
        label="<%= model.fields[name].comment %>"
      />
      {% endfor %}
    </ModalForm>
  );
};

export default AddForm;
