import React from 'react';

import './index.less';

import { NodeType } from '@/model/graph';

export const Node: React.FC<NodeType> = ({type, text, color, icon, isRoot, isDrag, ...props}) => {
  return (
    <div
      className="graph-node"
      draggable={!!isDrag}
      data-type={type}
      onClick={props?.onClick?.bind(this, { type, text, color, icon, isRoot })}
      onDragStart={props?.dragStartTrigger?.bind(this, { type, text, color, icon, isRoot })}
      >
      <div className="graph-node-title" style={{ background: color }}>
        <i className={`iconfont ${icon}`}></i>
        <span>{text}</span>
      </div>
      <div className="graph-node-content">节点内容</div>
    </div>
  );
}
