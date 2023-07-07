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

export const ButterflyTemplate: React.FC<IProps> = (props) => {
  const canvasRef = useRef(null);
  const [dragClassName, setDragClassName] = useState('');

  const labelClick = (edgeId: string) => {
    console.log(edgeId);
  }


  const onCreateEdge = (edge: IEdge) => {
    // console.log(edge);


    const index = data?.edges?.findIndex(item => {
      return (
        item.target === edge.targetEndpointId &&
        item.targetNode === edge.targetNodeId &&
        item.source === edge.sourceEndpointId &&
        item.sourceNode === edge.sourceNodeId
      );
    });


    if (index !== -1) {
      // (canvasRef.current as any)?.canvas?.removeEdge((data?.edges as Edge[])[index as number]);
      return;
    }

    const edgeId = uuidv4();

    data?.edges?.push({
      id: edgeId,
      target: edge.targetEndpointId,
      targetNode: edge.targetNodeId,
      source: edge.sourceEndpointId,
      sourceNode: edge.sourceNodeId,
      labelRender: () => <Label edgeId={edgeId} labelClick={labelClick} />
    });

    console.log(data.edges);

    setData(
      {
        ...data,
        edges: data.edges && [...data.edges]
      }
    );

  }

  const onDeleteEdge = (edge: IEdge) => {
    console.log(edge);
  }

  const [data, setData] = useState<GraphData>(
    {
      nodes: [],
      edges: [],
    }
  );

  const onNodeClick = (nodeType: NodeType) => {
    // console.log((canvasRef.current as any)?.canvas?.getDataMap());

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

  const onDrop = (et: React.DragEvent<HTMLDivElement>) => {
    setDragClassName('');

    const leftSideBarWidth = document.getElementById('side-bar-container')?.offsetWidth;

    console.log((canvasRef.current as any)?.canvas?.getDataMap());

    data.nodes.push({
      id: uuidv4(),
      left: et.clientX - (leftSideBarWidth as number) - 55,
      top: et.clientY,
      endpoints: getEndpointsByRoot(props.nodeType?.isRoot),
      render: () => <Node onClick={onNodeClick} {...props.nodeType as NodeType} />
    });


    setData(
      {
        ...data,
        nodes: [...data.nodes],
      }
    );
    
  }

  const onLoaded = (canvas: any) => {
    console.log(canvas.can)
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
        ref={canvasRef}
        onCreateEdge={onCreateEdge}
        onLoaded={onLoaded}
        onDeleteEdge={onDeleteEdge}
        {...data}
      />
    </div>
  );
}
