import { Tooltip } from "antd";
import React from "react";

import './index.less';

import { NodeType } from '@/model/graph';

import { Node } from '@/graph/CompactBoxTree';

const nodeTypeList: NodeType[] = [
  {
    type: "Starter",
    text: "发起人",
    color: "#576792",
    icon: "icon-account",
    isDrag: true,
    isRoot: true
  },
  {
    type: "Examiner",
    text: "审批人",
    color: "#ff9c4d",
    icon: "icon-account",
    isDrag: true
  },
  {
    type: "CopyPerson",
    text: "抄送人",
    color: "#4898fe",
    icon: "icon-account",
    isDrag: true
  },
  {
    type: "Processing",
    text: "办理",
    color: "#fe7952",
    icon: "icon-todo-list",
    isDrag: true
  },
  {
    type: "fork",
    text: "条件分支",
    color: "#5fb3a0",
    icon: "icon-tree",
    isDrag: true
  }
];

export const SideBar: React.FC<{ selectNodeType: (nodeType: NodeType) => void; }> = (props) => {
  const dragStartTrigger = (data: NodeType) => {
    props.selectNodeType(data);
  }

  return (
    <div className="side-bar">
      <div className="graph-item">
        <div className="title">
          <Tooltip placement="right" title="一种利用紧凑盒树进行布局的DAG图">
            <span>紧凑盒树</span>
          </Tooltip>
        </div>
        <div className="graph-node-list">
          {
            nodeTypeList.map((item, key) => <Node key={key} {...item} dragStartTrigger={dragStartTrigger} />)
          }
        </div>
      </div>
    </div>
  );
}
