import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from '../components/Tabs';

const TABS_LIST= [
  {
    name: 'introduction',
    subTabs: [
      { name: 'what is react.js', content: 'content for subtab1' },
      { name: 'getting started', content: 'content for subtab2' }
    ],
    content: 'content for tab1'
  },
  {
    name: 'the instance',
    subTabs: [
      { name: 'creating a instance', content: 'content for subtab3' },
      { name: 'data and methods', content: 'content for subtab4' },
      { name: 'instance lifecycle hooks', content: 'content for subtab5' }
    ],
    content: 'content for tab2'
  },
  {
    name: 'list rendering',
    subTabs: [
      { name: 'mapping an array to elements', content: 'content for subtab6' },
    ],
    content: 'content for tab3'
  },
]

class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Tabs>
          {TABS_LIST.map((tab, index) => (
            <div label={tab.name} key={index} subTabs={tab.subTabs}>
              {tab.content}
            </div>
          ))}
        </Tabs>
      </div>
    );
  }
}
export default Panel
