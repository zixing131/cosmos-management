/**
 * template config
 * @param filename <%= Identity %>List.jsx
 * @param directory client/src/pages/<%= identity %>
 */
import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, message } from 'antd';
import { add<%= Identity %>, remove<%= Identity %>, query<%= Identity %>, update<%= Identity %> } from '@/services/<%= identity %>/api';
import { PlusOutlined } from '@ant-design/icons';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import AddForm from './components/AddForm';
import UpdateForm from './components/UpdateForm';

/**
 * 添加<%=name %>
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  try {
    await add<%= Identity %>({
      ...fields,
    });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * 更新<%=name %>
 *
 * @param fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('Configuring');
  try {
    await update<%= Identity %>({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 * 删除<%=name %>
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await remove<%= Identity %>({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};
const <%= Identity %>List = () => {
  /**
   * 新建窗口的弹窗
   *  */
  const [addModalVisible, handleModalVisible] = useState(false);
  /**
   * 更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  const columns = [
      {% for name, field, comment in model.fields %}
      {
        title:  '<%= model.fields[name].comment %>',
        dataIndex: '<%= name %>',
        valueType: 'textarea',
      }, 
      {% endfor %}
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={'<%=name %>管理'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={query<%= Identity %>}
        columns={columns}
      />
      <AddForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
        }}
        addModalVisible={addModalVisible}
        changeVisible={handleModalVisible}
        values={currentRow || {}}
      />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        changeVisible={handleUpdateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default <%= Identity %>List;
