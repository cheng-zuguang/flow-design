import React, { useState } from 'react';

import './index.less';

import { NodeType } from '@/model/graph';

export const Node: React.FC<NodeType> = ({id, type, text, color, icon, isRoot, isDrag, ...props}) => {
  const [count, setCount] = useState(0);

  const onMouseDown = () => {
    setCount(new Date().getTime());
  }

  const onMouseUp = () => {
    setCount(new Date().getTime() - count);
  }

  return (
    <div
      className="graph-node"
      draggable={!!isDrag}
      data-type={type}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={props?.onClick?.bind(this, count < 200, { id, type, text, color, icon, isRoot })}
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
