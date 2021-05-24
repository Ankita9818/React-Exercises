import React from 'react';
import Tab from './Tab';

class SubTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSubTab: this.props.tabs[0].name,
    };
  }

  onClickSubTabItem = (subTab) => {
    this.setState({ activeSubTab: subTab });
  }

  render() {
    let tabs = this.props.tabs
    return (
      <div>
        {tabs.map((subchild, index) => {
          return(
            <Tab
              activeTab={this.state.activeSubTab}
              label={subchild.name}
              key={index}
              onClick={this.onClickSubTabItem}
            />
          )
        })}
        <div className="tab-content">
          {tabs.map((subchild) => {
            if (subchild.name !== this.state.activeSubTab) return undefined;
            return subchild.content;
          })}
        </div>
      </div>
    );
  }
}

export default SubTabs;
