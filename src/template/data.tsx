import React from 'react';
import { Node } from '@/graph/CompactBoxTree';
// import Label from './label.js';

import { Label } from '@/graph/label';

const endpoints = [
  {
    id: 'top',
    orientation: [0, 0],
    pos: [0.5, 0],

  },
  {
    id: 'bottom',
    orientation: [0, 1],
    pos: [0.5, 0],
  }
];

const getEndpointsByRoot = (isRoot: boolean) => isRoot ?  [endpoints[1]] : endpoints;

const startTypes = {
  type: "Starter",
  text: "发起人",
  color: "#576792",
  icon: "icon-account",
}

const types = {
  type: "fork",
  text: "条件分支",
  color: "#5fb3a0",
  icon: "icon-tree"
}

const data = {
  nodes: [
    {
      id: '1',
      isRoot: true,
      endpoints: getEndpointsByRoot(true),
      left: 500,
      top: 50,
      render() {
        return (
          <Node {...startTypes} />
        );
      }
    },
    {
      id: '2',
      endpoints: getEndpointsByRoot(false),
      left: 500,
      top: 200,
      render() {
        return (
          <Node
            {...types}
          />
        );
      }
    },
  ],
  edges: [
    {
      id: '1-2',
      sourceNode: '1',
      targetNode: '2',
      source: 'bottom',
      target: 'top',
      shapeType: 'Straight',
      arrow: true,
      defaultAnimate: true,
      arrowPosition: 1,
      labelRender() {
        // return <Label />
      }
    }
  ],
  onCreateEdge: (e: any) => {  console.log(e, 'edge') }
};


// const data = {
//   nodes: [
//     {
//       isRoot: true,
//       id: 'Root',
//       left: 200,
//       top: 20,
//       endpoints: endpoints,
//       render() {
//         return (
//           <Node {...types} />
//         );
//       },
//       children: [
//         {
//           id: 'child1',
//           endpoints: endpoints,
//           render() {
//             return (
//               <Node {...types} />
//             );
//           },
//         }
//       ]
//     },
//   ],
//   edges: [
//     {
//       id: '1-2',
//       sourceNode: 'Root',
//       targetNode: 'child1',
//       source: 'top',
//       target: 'bottom',
//       shapeType: 'Bezier',
//       labelRender() {
//         return <Label />
//       }
//     }
//   ],
// };

export default data;

const mockData = {
  nodes: {
    isRoot: true,
    id: 'Root',
    title: '根节点',
    content: 'root',
    iconClass: 'icon-class',
    iconType: 'icon-shujuji',
    Class: Node,
    endpoints: [{
      id: '1',
      orientation: [0, 1],
      pos: [0.5, 0]
    }],
    children: [{
      id: 'subNode1',
      Class: Node,
      title: '子节点 1',
      content: 'sub node 1',
      // collapsed: true,
      iconType: 'icon-guize-kai',
      iconClass: 'icon-class',
      endpoints: [{
        id: '1',
        orientation: [0, -1],
        pos: [0.5, 0]
      }, {
        id: '2',
        orientation: [0, 1],
        pos: [0.5, 0]
      }],
      children: [{
        id: 'subNode1-1',
        Class: Node,
        title: '子节点 1-1',
        content: 'sub node 1-1',
        iconType: 'icon-guize-kai',
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
      }, {
        id: 'subNode1-2',
        Class: Node,
        title: '子节点 1-2',
        content: 'sub node 1-2',
        iconType: 'icon-guize-kai',
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
      }]
    }, {
      id: 'subNode2',
      Class: Node,
      title: '子节点 2',
      content: 'sub node 2',
      iconType: 'icon-guize-kai',
      iconClass: 'icon-class',
      // collapsed: true,
      endpoints: [{
        id: '1',
        orientation: [0, -1],
        pos: [0.5, 0]
      }, {
        id: '2',
        orientation: [0, 1],
        pos: [0.5, 0]
      }],
      children: [{
        id: 'subNode2-1',
        Class: Node,
        title: '子节点 2-1',
        content: 'sub node 2-1',
        iconType: 'icon-guize-kai',
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
      }, {
        id: 'subNode2-2',
        Class: Node,
        title: '子节点 2-2',
        content: 'sub node 2-2',
        iconType: 'icon-guize-kai',
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
      }]
    }, {
      id: 'subNode3',
      Class: Node,
      title: '子节点 3',
      content: 'sub node 3',
      iconType: 'icon-guize-kai',
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
    }]
  },
  edges: [{
    id: '0',
    source: '1',
    target: '1',
    sourceNode: 'Root',
    targetNode: 'subNode1',
    type: 'endpoint'
  }, {
    id: '1',
    source: '1',
    target: '1',
    sourceNode: 'Root',
    targetNode: 'subNode2',
    type: 'endpoint'
  }, {
    id: '2',
    source: '1',
    target: '1',
    sourceNode: 'Root',
    targetNode: 'subNode3',
    type: 'endpoint'
  }, {
    id: '3',
    source: '2',
    target: '1',
    sourceNode: 'subNode1',
    targetNode: 'subNode1-1',
    type: 'endpoint'
  }, {
    id: '4',
    source: '2',
    target: '1',
    sourceNode: 'subNode1',
    targetNode: 'subNode1-2',
    type: 'endpoint'
  }, {
    id: '5',
    source: '2',
    target: '1',
    sourceNode: 'subNode2',
    targetNode: 'subNode2-1',
    type: 'endpoint'
  }, {
    id: '6',
    source: '2',
    target: '1',
    sourceNode: 'subNode2',
    targetNode: 'subNode2-2',
    type: 'endpoint'
  }]
};