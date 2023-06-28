import $ from 'jquery';
import { TreeNode } from 'butterfly-dag';

import './node.less';

class BaseNode extends TreeNode {
  draw = (opts: any) => {
    // console.log(opts)
    const container = $('<div class="iot-node"></div>')
      .css('top', opts.top + 'px')
      .css('left', opts.left + 'px')
      .attr('id', opts.id);
    // console.log(container)

    const titleDom = $(`<div class="title"><i class="iconfont ${opts.options.iconType} ${opts.options.iconClass}"></i>${opts.options.title}<div>`);
    const contentDom = $(`<div class="content">${opts.options.content}<div>`);

    container.append(titleDom);
    container.append(contentDom);
    this.showExpandBtn(container);
    return container[0];
  }

  // @ts-ignore
  showExpandBtn(container = this.dom) {
    const expandBtn = $(`<div class='expand-btn'>-</div>`);
    console.log(container, '123')
    expandBtn.on('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      // @ts-ignore
      this.remove();
      // @ts-ignore
      // if (this.collapsed) {
      //   // 可以在这里向后端请求数据,把node穿进去expand里面
      //   // @ts-ignore
      //   this.expand();
      // } else {
      //   // @ts-ignore
      //   this.collapse();
      // }
      // console.log(this.canvas)
      // console.log(window)
      // console.log(window.Butterfly.Canvas.addNode)
      // (window as any).Butterfly.Canvas.addNode({
      //   id: 'subNode3-3',
      //   Class: BaseNode,
      //   title: '子节点 3-3',
      //   content: 'sub node 3-3',
      //   iconType: 'icon-tree',
      //   iconClass: 'icon-class',
      //   endpoints: [{
      //     id: '1',
      //     orientation: [0, -1],
      //     pos: [0.5, 0]
      //   }, {
      //     id: '2',
      //     orientation: [0, 1],
      //     pos: [0.5, 0]
      //   }] 
      // });

    });
    expandBtn.appendTo(container);
  }
}

export default BaseNode;
