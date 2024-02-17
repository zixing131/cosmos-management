import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, Image, message } from 'antd';
import { addCases, removeCases, queryCases, updateCases } from '@/services/cases/api';
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
 * 添加案例
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  try {
    await addCases({
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
 * 更新案例
 *
 * @param fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('Configuring');
  try {
    await updateCases({
      ...fields,
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
 * 删除案例
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeCases({
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
const CasesList = () => {
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
      title: 'ID',
      dataIndex: 'id',
      valueType: 'textarea',
    },

    {
      title: '品牌',
      dataIndex: 'brand',
      valueType: 'textarea',
    },

    {
      title: '系列',
      dataIndex: 'series',
      valueType: 'textarea',
    },

    {
      title: '列表首图',
      dataIndex: 'image',
      render: (_, record) => (
        <Image
          src={record.image || 'https://www.changan.com.cn/cars_m/UNI-V/images/meitu/1.jpg'}
          style={{ width: 150 }}
        />
      ),
    },

    {
      title: '产品名称',
      dataIndex: 'product_name',
      valueType: 'textarea',
    },

    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'textarea',
    },

    {
      title: '更新时间',
      dataIndex: 'update_time',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'edit',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            编辑
          </a>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
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
        request={queryCases}
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
          handleModalVisible(false);
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

export default CasesList;
