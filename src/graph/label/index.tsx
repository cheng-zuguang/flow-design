import React from "react";

import './index.less';

interface IProps {
  edgeId: string;
  labelClick: (edgeId: string) => void;
}

export const Label: React.FC<IProps> = (props) => {
  return (
    <div className="label" onClick={props.labelClick.bind(this, props.edgeId)}>
      <i className="iconfont icon-plus"></i>
    </div>
  );
}
