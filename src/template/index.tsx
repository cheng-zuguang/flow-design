import React, { Component, useRef, useState } from 'react';
// import Node from './node';

// import mockData from './data';

// import 'butterfly-dag/dist/index.css';
import './index.less';

import { NodeType, GraphData, Endpoints, Edge, IEdge } from '@/model/graph';

// @ts-ignore
import ReactButterfly from 'butterfly-react';

import { v4 as uuidv4 } from 'uuid';
import { Node } from '@/graph/CompactBoxTree';
import { Label } from '@/graph/label';
import { Drawer, Tabs } from 'antd';


interface IProps {
  nodeType?: NodeType
}

const endpoints: Endpoints[] = [
  {
    id: 'top',
    orientation: [0, -1],
  },
  {
    id: 'bottom',
    orientation: [0, 1],
  }
];

const getEndpointsByRoot = (isRoot: boolean | undefined) => isRoot ? [endpoints[1]] : endpoints;

let canvasInstance: any;

export const ButterflyTemplate: React.FC<IProps> = (props) => {
  // const canvasRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [dragClassName, setDragClassName] = useState('');

  const onClose = () => {
    setOpen(false);
  };

  const labelClick = (edgeId: string) => {
    console.log(edgeId);
  }

  const replaceEdgeByCustomEdge = (baseEdge: any, edge: IEdge) => {
    canvasInstance?.removeEdge(baseEdge);

    const edgeId = uuidv4();

    data?.edges?.push({
      id: edgeId,
      target: edge.targetEndpointId,
      targetNode: edge.targetNodeId,
      source: edge.sourceEndpointId,
      sourceNode: edge.sourceNodeId,
      // labelRender: () => <Label edgeId={edgeId} labelClick={labelClick} />
    });

    setData(
      {
        ...data,
        edges: data.edges && [...data.edges]
      }
    );
  }

  const onCreateEdge = (edge: IEdge) => {
    // console.log(canvasInstance)
    const canvasDataMap = canvasInstance?.getDataMap();

    const lastIndex = canvasDataMap?.edges?.length - 1;
    const item = canvasDataMap?.edges[lastIndex];

    replaceEdgeByCustomEdge(item, edge);
    keepNodePosition(canvasDataMap?.nodes)
  }

  const onDeleteEdge = (edge: IEdge) => {
    console.log(edge);

    const ix = data?.edges?.findIndex(item => {
      return (
        item.target === edge.targetEndpointId ||
        item.targetNode === edge.targetNodeId ||
        item.source === edge.sourceEndpointId ||
        item.sourceNode === edge.sourceNodeId
      );
    });

    if (ix !== -1) {
      data?.edges?.splice(ix as number, 1);

      setData(
        {
          ...data,
          edges: data.edges && [...data.edges]
        }
      );
    }
  }

  const [data, setData] = useState<GraphData>(
    {
      nodes: [],
      edges: [],
    }
  );

  const onNodeClick = (isClick: boolean, nodeType: NodeType) => {
    // console.log((canvasRef.current as any)?.canvas?.getDataMap());
    // console.log(isClick, nodeType);
    if (isClick) {
      setOpen(true);
    }
  }

  const onDragOver = (et: React.DragEvent<HTMLDivElement>) => {
    et.preventDefault();
  }

  const onDragEnter = (et: React.DragEvent<HTMLDivElement>) => {
    setDragClassName('dragenter');
  }

  const onDragLeave = (et: React.DragEvent<HTMLDivElement>) => {
    // console.log(123, et)
    et.stopPropagation();
    setDragClassName('');
  }

  const keepNodePosition = (nodes: any[]) => {
    if (Array.isArray(nodes)) {
      nodes.map(item => {
        const ix = data.nodes.findIndex(n => n.id === item?.id);
        if (ix !== -1) {
          data.nodes[ix].top = item?.top;
          data.nodes[ix].left = item?.left;
        }
      });

      setData(
        {
          ...data,
          nodes: [...data.nodes],
        }
      );
    }
  }

  const addNode = (clientX: number, clientY: number) => {
    const leftSideBarWidth = document.getElementById('side-bar-container')?.offsetWidth;

    const id = uuidv4();

    data.nodes.push({
      id,
      left: clientX - (leftSideBarWidth as number) - 55,
      top: clientY,
      endpoints: getEndpointsByRoot(props.nodeType?.isRoot),
      render: () => <Node onClick={onNodeClick} {...{ id, ...props.nodeType as NodeType }} />
    });

    setData(
      {
        ...data,
        nodes: [...data.nodes],
      }
    );
  }

  const onDrop = (et: React.DragEvent<HTMLDivElement>) => {
    setDragClassName('');

    // console.log(canvasInstance.getDataMap());

    keepNodePosition(canvasInstance?.getDataMap()?.nodes);

    addNode(et.clientX, et.clientY);
  }

  const onLoaded = (canvas: any) => {
    console.log(canvas)
    canvasInstance = canvas;

    canvas.on('system.node.click', (data: any) => {
      console.log(data)
    });
  }

  return (
    <div
      className={`butterfly-container-wrap ${dragClassName}`}
      onDragOver={onDragOver.bind(this)}
      onDragEnter={onDragEnter.bind(this)}
      onDragLeave={onDragLeave.bind(this)}
      onDrop={onDrop.bind(this)}
    >
      <ReactButterfly
        // ref={canvasRef}
        onCreateEdge={onCreateEdge}
        onLoaded={onLoaded}
        onDeleteEdge={onDeleteEdge}
        {...data}
      />

      <Drawer
        title="Basic Drawer"
        placement={'right'}
        closable={false}
        onClose={onClose}
        open={open}
        size='large'
      >
        <div className='drawer-wrapper'>
          <Tabs
            // onChange={onChange}
            type="card"
            items={new Array(3).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `Tab ${id}`,
                key: id,
                children: `Content of Tab Pane ${id}`,
              };
            })}
          />
        </div>

      </Drawer>
    </div>
  );
}
