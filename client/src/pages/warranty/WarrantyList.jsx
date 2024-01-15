import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, message } from 'antd';
import {
  addWarranty,
  removeWarranty,
  queryWarranty,
  updateWarranty,
} from '@/services/warranty/api';
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
import { WARRANTY_STATUS, WARRANTY_STATUS_MAP } from '@/const';

/**
 * 添加质保单
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  try {
    await addWarranty({
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
 * 更新质保单
 *
 * @param fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('Configuring');
  try {
    await updateWarranty({
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
 * 删除质保单
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeWarranty({
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
const WarrantyList = () => {
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
      title: 'id',
      dataIndex: 'id',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
    },

    {
      title: '经销商名称',
      dataIndex: 'dealer',
      valueType: 'textarea',
    },

    {
      title: '车主姓名',
      dataIndex: 'owner_name',
      valueType: 'textarea',
    },

    {
      title: '车主联系电话',
      dataIndex: 'phone_number',
      valueType: 'textarea',
    },

    {
      title: '车牌号码',
      dataIndex: 'license_plate',
      valueType: 'textarea',
    },

    {
      title: '车辆品牌',
      dataIndex: 'car_brand',
      valueType: 'textarea',
      hideInSearch: true,
    },

    {
      title: '产品系列',
      dataIndex: 'product_series',
      valueType: 'textarea',
      hideInSearch: true,
    },

    {
      title: '卷轴编号',
      dataIndex: 'coil_number',
      valueType: 'textarea',
      hideInSearch: true,
    },

    {
      title: '施工日期',
      dataIndex: 'construction_date',
      valueType: 'textarea',
    },

    {
      title: '质保截止日期',
      dataIndex: 'expiration_date',
      valueType: 'textarea',
    },

    {
      title: '当前状态',
      dataIndex: 'status',
      valueEnum: {
        [WARRANTY_STATUS.PROCESSING]: {
          text: WARRANTY_STATUS_MAP[WARRANTY_STATUS.PROCESSING],
          status: 'Processing',
        },
        [WARRANTY_STATUS.APPROVED]: {
          text: WARRANTY_STATUS_MAP[WARRANTY_STATUS.APPROVED],
          status: 'Success',
        },
        [WARRANTY_STATUS.CLOSED]: {
          text: WARRANTY_STATUS_MAP[WARRANTY_STATUS.CLOSED],
          status: 'Error',
        },
      },
    },

    {
      title: '车辆照片',
      dataIndex: 'vehicle_photo',
      valueType: 'textarea',
      hideInTable: true,
    },

    {
      title: '总报价',
      dataIndex: 'total_price',
      valueType: 'textarea',
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={'质保单管理'}
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
        request={queryWarranty}
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

export default WarrantyList;
