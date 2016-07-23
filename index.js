'use strict';

exports.getTabProps = function (uid, parentProps, props) {

  const num = parentProps.tabs.findIndex(tab => tab.uid === uid.uid) + 1;
  return Object.assign({}, props, {
    number: num < 10 ? `⌘${num}` : ''
  });
};

exports.decorateTab = function (Tab, { React }) {

  return class extends Tab {
    render() {

      const numberChild = React.createElement('span', { className: 'tab_number' }, `${this.props.number}`);
      const customChildrenBefore = Array.from(this.props.customChildrenBefore || []).concat(numberChild);
      return React.createElement(Tab, Object.assign({}, this.props, { customChildrenBefore }));
    }
  }
};

exports.decorateConfig = function (config) {

  return Object.assign({}, config, {
    css: `
      ${config.css || ''}
      .tab_icon {
        left: 7px;
      }
      .tab_number {
        right: 7px;
        position: absolute;
        transform: scale(.85);
        color: #909090;
      }
    `
  });
};
