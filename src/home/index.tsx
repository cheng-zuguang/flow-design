import { Col, Row, Tooltip } from "antd";
import React, { useState } from "react";

import { ButterflyTemplate } from '@/template'

import './index.less';

import { SideBar } from './sidebar';

import { NodeType } from '@/model/graph';

export const Home: React.FC = () => {
  const [currentSelectNodeType, setCurrentSelectNodeType] = useState<NodeType>();

  return (
    <div className="home">
      <Row style={{ height: '100%', margin: 0 }} gutter={12}>
        <Col id="side-bar-container" xs={0} sm={0} md={10} lg={6} xl={6}>
          <SideBar selectNodeType={(nodeType) => setCurrentSelectNodeType(nodeType)} />
        </Col>
        <Col xs={24} sm={24} md={14} lg={18} xl={18}>
          <ButterflyTemplate nodeType={currentSelectNodeType} />
        </Col>
      </Row>
    </div>
  );
}
