import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, message } from 'antd';
import { addAccount, removeAccount, queryAccount, updateAccount } from '@/services/account/api';
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
 * 添加管理后台账号
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  try {
    await addAccount({
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
 * 更新管理后台账号
 *
 * @param fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('Configuring');
  try {
    await updateAccount({
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
 * 删除管理后台账号
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeAccount({
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
const AccountList = () => {
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
      
      {
        title:  '唯一标识',
        dataIndex: 'id',
        valueType: 'textarea',
      }, 
      
      {
        title:  '用户名',
        dataIndex: 'username',
        valueType: 'textarea',
      }, 
      
      {
        title:  '密码',
        dataIndex: 'password',
        valueType: 'textarea',
      }, 
      
      {
        title:  '电子邮件',
        dataIndex: 'email',
        valueType: 'textarea',
      }, 
      
      {
        title:  '电话',
        dataIndex: 'phone',
        valueType: 'textarea',
      }, 
      
      {
        title:  '微信用户唯一标识',
        dataIndex: 'open_id',
        valueType: 'textarea',
      }, 
      
      {
        title:  '创建时间',
        dataIndex: 'create_time',
        valueType: 'textarea',
      }, 
      
      {
        title:  '更新时间',
        dataIndex: 'update_time',
        valueType: 'textarea',
      }, 
      
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={'管理后台账号管理'}
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
        request={queryAccount}
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

export default AccountList;
