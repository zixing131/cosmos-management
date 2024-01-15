import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, message } from 'antd';
import { addUser, removeUser, queryUser, updateUser } from '@/services/user/api';
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
 * 添加微信用户
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({
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
 * 更新微信用户
 *
 * @param fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('Configuring');
  try {
    await updateUser({
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
 * 删除微信用户
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeUser({
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
const UserList = () => {
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
        title:  '用户ID',
        dataIndex: 'id',
        valueType: 'textarea',
      }, 
      
      {
        title:  '微信用户唯一标识',
        dataIndex: 'open_id',
        valueType: 'textarea',
      }, 
      
      {
        title:  '用户名',
        dataIndex: 'username',
        valueType: 'textarea',
      }, 
      
      {
        title:  '昵称',
        dataIndex: 'nickname',
        valueType: 'textarea',
      }, 
      
      {
        title:  '密码',
        dataIndex: 'password',
        valueType: 'textarea',
      }, 
      
      {
        title:  '邮箱',
        dataIndex: 'email',
        valueType: 'textarea',
      }, 
      
      {
        title:  '电话',
        dataIndex: 'phone',
        valueType: 'textarea',
      }, 
      
      {
        title:  '头像',
        dataIndex: 'avatar',
        valueType: 'textarea',
      }, 
      
      {
        title:  '性别',
        dataIndex: 'gender',
        valueType: 'textarea',
      }, 
      
      {
        title:  '国家',
        dataIndex: 'country',
        valueType: 'textarea',
      }, 
      
      {
        title:  '省份',
        dataIndex: 'province',
        valueType: 'textarea',
      }, 
      
      {
        title:  '城市',
        dataIndex: 'city',
        valueType: 'textarea',
      }, 
      
      {
        title:  '创建时间',
        dataIndex: 'create_time',
        valueType: 'textarea',
      }, 
      
      {
        title:  '修改时间',
        dataIndex: 'update_time',
        valueType: 'textarea',
      }, 
      
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={'微信用户管理'}
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
        request={queryUser}
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

export default UserList;
