import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { ConfigProvider, DatePicker, Button } from 'antd';
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// import zhCN from 'antd/locale/zh_CN';
// import 'antd/dist/reset.css';

import './App.less';

// dayjs.locale('zh-cn');

import CompactBoxTree from '../src/compactTree';

const AppComponent: React.FC = () => {
  return (
      <div className='container'>
        {/* <Link to={`playground`}>TO PlayGround</Link> */}
        {/* <DatePicker /> */}
        {/* <Button>123</Button> */}
        <CompactBoxTree />
        
        <Outlet />
      </div>
  )
};

export default AppComponent;
