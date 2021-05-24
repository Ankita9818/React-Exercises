import React from 'react';
import Tab from './Tab';
import SubTabs from './SubTabs';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child, index) => {
            const { label, subTabs } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={index}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <ol className="sub-tabs-section">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return(
              <SubTabs
                tabs={child.props.subTabs}
                active={activeTab}
                onClickTabItem={onClickTabItem}
              />
            )
          })}
        </ol>
      </div>
    );
  }
}

export default Tabs;
