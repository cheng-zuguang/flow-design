export interface NodeType {
  type: string;
  color: string;
  text: string;
  icon: string;
  isRoot?: boolean;
  isDrag?: boolean;
  onClick?: (data: NodeType) => void;
  dragStartTrigger?: (data: NodeType) => void;
}

// https://github.com/alibaba/butterfly/blob/master/docs/zh-CN/endpoint.md
export interface Endpoints {
  id: string;
  orientation?: [0, 1] | [0, -1] | [1, 0] | [-1, 0];
  pos?: [0, 0] | [0, 1] | [1, 0] | [1, 1];
  type?: 'source' | 'target' | undefined | 'onlyConnect';
  scope?: string;
  disLinkable?: boolean;
  expandArea?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  limitNum?: number;
  connectedNum?: number;
  dom?: any;
  Class?: any;
  root?: string;
}

export interface Node {
  /**
   * 节点唯一标识
  */
  id: string;
  top: number;
  left: number;
  draggable?: boolean;
  group?: boolean;
  endpoints?: Endpoints[];
  Class?: any;
  scope?: boolean;
  render: () => JSX.Element;
}

export type PosLimit = 'Left' | 'Right' | 'Top' | 'Bottom';
export type ShapeType = 'Bezier' | 'Flow' | 'Straight' | 'Manhattan' | 'AdvancedBezier' | 'Bezier2-1' | 'Bezier2-2' | 'Bezier2-3' | 'BrokenLine';

export interface Edge {
  id: string;
  type?: 'endpoint' | 'node';
  targetNode?: string;
  target?: string;
  sourceNode?: string;
  source?: string;
  orientationLimit?: PosLimit[];
  shapeType?: ShapeType;
  hasRadius?: boolean;
  labelRender: () => JSX.Element;
  labelPosition?: number;
  labelOffset?: number;
  arrow?: boolean;
  arrowPosition?: number;
  arrowOffset?: number;
  // https://github.com/alibaba/butterfly/blob/master/docs/zh-CN/edge.md#arrowshapetype-string---%E9%80%89%E5%A1%AB
  arrowShapeType?: string;
  Class?: any;
}

export interface GraphData {
  nodes: Node[];
  edges?: Edge[];
  onEdgesChange?: (edge: IEdge[]) => void;
  onCreateEdge?: (edge: IEdge) => void;
  /**
   * @description 当线从一个锚点拖拽到新的锚点时触发	
   * @param res 
   * @returns 
   */
  onReconnectEdge?: (res: any) => void;
  onDeleteEdge?: (edge: IEdge) => void;
  /**
   * @description 画布加载完毕后返回画布实例
   * @param canvas canvans实例
   * @returns 
   */
  onLoaded?: (canvas: any) => void;
}

export interface IEdge {
  sourceEndpointId: string;
  sourceNodeId: string;
  targetEndpointId: string;
  targetNodeId: string;
}
