export const WARRANTY_STATUS = {
  PROCESSING: 1,
  APPROVED: 2,
  CLOSED: 3,
}

export const WARRANTY_STATUS_MAP = {
  [WARRANTY_STATUS.PROCESSING]: '处理中',
  [WARRANTY_STATUS.APPROVED]: '已通过',
  [WARRANTY_STATUS.CLOSED]: '已关闭',
}

export const WARRANTY_STATUS_OPTION = [
  {
    label: WARRANTY_STATUS_MAP[WARRANTY_STATUS.PROCESSING],
    value: WARRANTY_STATUS.PROCESSING,
  },
  {
    label: WARRANTY_STATUS_MAP[WARRANTY_STATUS.APPROVED],
    value: WARRANTY_STATUS.APPROVED,
  },
  {
    label: WARRANTY_STATUS_MAP[WARRANTY_STATUS.CLOSED],
    value: WARRANTY_STATUS.CLOSED,
  },
]

export const INDEX_BANNER_LIST = 'INDEX_BANNER_LIST';
export const INDEX_BRAND = 'INDEX_BRAND';
export const INDEX_WARRANTY_ENTRANCE = 'INDEX_WARRANTY_ENTRANCE';
export const INDEX_QUOTATION_ENTRANCE = 'INDEX_QUOTATION_ENTRANCE';
export const WARRANTY_SEARCH_IMAGE = 'WARRANTY_SEARCH_IMAGE';
export const ABOUT_US = 'ABOUT_US';

export const INFO_TYPE = {
  INDEX: "INDEX",
  QUERY: "QUERY",
  WARRANTY: "WARRANTY",
  ABOUT_US: "ABOUT_US",
}

export const INFO_TYPE_TEXT = {
  [INFO_TYPE.INDEX]: "首页",
  [INFO_TYPE.QUERY]: "搜索页面",
  [INFO_TYPE.ABOUT_US]: "关于我们",
}

export const INFO_TYPE_TAB_OPTION = [
  {
    tab: INFO_TYPE_TEXT[INFO_TYPE.INDEX],
    key: INFO_TYPE.INDEX,
  },
  {
    tab: INFO_TYPE_TEXT[INFO_TYPE.QUERY],
    key: INFO_TYPE.QUERY,
  },
  {
    tab: INFO_TYPE_TEXT[INFO_TYPE.ABOUT_US],
    key: INFO_TYPE.ABOUT_US,
  },
]

export const INFO_TYPE_KEYS = {
  [INFO_TYPE.INDEX]: [
    {
      optionKey: INDEX_BANNER_LIST,
      label: '首页轮播图',
      maxCount: 5,
      type: 'image',
      width: 342,
      height: 500,
    },
    {
      optionKey: INDEX_WARRANTY_ENTRANCE,
      label: '质保查询',
      maxCount: 1,
      type: 'image',
      width: 493,
      height: 261,
    },
    {
      optionKey: INDEX_QUOTATION_ENTRANCE,
      label: '报价入口',
      maxCount: 1,
      type: 'image',
      width: 493,
      height: 261,
    },
    {
      optionKey: INDEX_BRAND,
      label: '品牌介绍',
      maxCount: 1,
      type: 'image',
      // width: 358,
      // height: 200,
    }
  ],
  [INFO_TYPE.QUERY]: [
    {
      optionKey: WARRANTY_SEARCH_IMAGE,
      label: '搜索页面图片',
      maxCount: 3,
      type: 'image',
      // width: 370,
      // height: 208,
    }
  ],
  [INFO_TYPE.ABOUT_US]: [
    {
      optionKey: ABOUT_US,
      label: '关于我们图片',
      maxCount: 20,
      type: 'image',
    }
  ],
}