import React, { useRef, useState, useEffect } from 'react';
import { Button, Drawer, Input, message } from 'antd';
import { addInfo, removeInfo, queryInfo, updateInfo } from '@/services/info/api';
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
import { INDEX_BANNER_LIST, INDEX_QUOTATION_ENTRANCE, INDEX_WARRANTY_ENTRANCE } from '@/const';
import AddForm from './components/AddForm';
import UpdateForm from './components/UpdateForm';
import { INFO_TYPE_TAB_OPTION, INFO_TYPE, INFO_TYPE_KEYS } from '@/const';
import InfoUploader from '@/components/InfoUploader';


const getInfoImage = (list = [], key) => list?.filter((item) => item.type === key);

const InfoList = () => {
  const [infoType, setInfoType] = useState(INFO_TYPE.INDEX);
  const [infoOptions, setInfoOptions] = useState(
    INFO_TYPE_KEYS[infoType]);
  console.log('infoOptions', infoType);
  console.log('INFO_TYPE_TAB_OPTION', INFO_TYPE_TAB_OPTION);

  const [list, setList] = useState([]);

  const getList = async () => {
    const res = await queryInfo();
    if (res?.data) {
      setList(res.data);
    }
  }

  const createInfo = async ({type, content}) => {
    const res = await addInfo({
      type, 
      content
    });
    if (res?.data) {
      message.success('添加成功');
      getList();
      return true;
    }
    return false;
  }

  useEffect(() => {
    getList();
  }, [])

  return (
    <PageContainer
      tabList={INFO_TYPE_TAB_OPTION}
      onTabChange={(key) => {
        setInfoType(key);
        setInfoOptions(INFO_TYPE_KEYS[key]);
      }}
    >
      {Array.isArray(infoOptions) &&
        infoOptions.map((item) => <InfoUploader key={item.optionKey} {...item} files={getInfoImage(list, item.optionKey)} />)}
    </PageContainer>
  );
};

export default InfoList;
