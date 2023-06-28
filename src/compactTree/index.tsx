import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TreeCanvas } from 'butterfly-dag';
import Node from './node';

import mockData from './data';

import 'butterfly-dag/dist/index.css';
import './index.less';

class CompactBoxTree extends Component {
  canvas: any;

  componentDidMount() {
    let root = document.getElementById('dag-canvas');
    // @ts-ignore

    this.canvas = new TreeCanvas({
      root: root,
      disLinkable: true, // 可删除连线
      linkable: true,    // 可连线
      draggable: true,   // 可拖动
      zoomable: true,    // 可放大
      moveable: true,    // 可平移
      theme: {
        edge: {
          shapeType: 'Manhattan',
          arrow: true
        }
      },
      layout: {
        type: 'compactBox',
        options: {
          direction: 'TB',
          getHeight(d: any) {
            return 60;
          },
          getWidth(d: any) {
            return 120;
          },
          getHGap(d: any) {
            return 20;
          },
          getVGap(d: any) {
            return 80;
          },
        }
      }
    });
    // @ts-ignore

    this.canvas.draw(mockData, {}, () => {
      // @ts-ignore

      this.canvas.focusCenterWithAnimate();
    });
  }

  render() {
    return (
      <div className='compact-box-tree-page'>
        <div className="compact-box-tree-canvas" id="dag-canvas">
        </div>
        <div className="panel">
          <div className='btn' onClick={() => {
            this.canvas.addNode({
              id: 'subNode3-3',
              Class: Node,
              title: '子节点 3-3',
              content: 'sub node 3-3',
              iconType: 'icon-tree',
              iconClass: 'icon-class',
              endpoints: [{
                id: '1',
                orientation: [0, -1],
                pos: [0.5, 0]
              }, {
                id: '2',
                orientation: [0, 1],
                pos: [0.5, 0]
              }]
            });
          }}>新增一个节点</div>
        </div>
      </div>
    );
  }
}

export default CompactBoxTree;
