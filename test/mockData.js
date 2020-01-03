module.exports = {
  moduleData: {
    id: 17679,
    name: 'hook',
    cover: 'https://img.alicdn.com/tfs/TB1mkjeqlr0gK0jSZFnXXbRRXXa-1404-1292.png'
  },
  code: {
    panelDisplay: [
      {
        panelName: 'background.jsx',
        panelType: 'js',
        panelValue:"'use strict';\n\nimport { createElement, Component, render } from 'rax';\nimport View from 'rax-view';\nimport View from 'rax-scrollview';\nimport Image from 'rax-image';\nimport Slider from './slider';\nimport Card from './card';\nimport styles from './background.css';\n\nconst print = function(value) {\n  console.log(value);\n};\nexport default class Background extends Component {\n  state = { data: [] };\n  constructor(props, context) {\n    super();\n    console.log('super props');\n  }\n  componentDidUpdate(prevProps, prevState, snapshot) {}\n  isReadCountShow(readCount) {\n    return readCount > 200;\n  }\n  render() {\n    return (\n      <View style={styles.bg1}>\n        <Image source={{ uri: 'https://img.alicdn.com/tfs/TB194fjrKT2gK0jSZFvXXXnFXXa-1502-788.png' }} />\n      </View>\n    );\n  }\n}\n",
        panelImports: [
          "import View from 'rax-view'",
          "import Slider from './slider'",
          "import Card from './card'",
          "import View from 'rax-scrollview'",
          "import View from 'rax-filter1'"
        ]
      },
      {
        panelName: 'background.css',
        panelValue:".bg1 {\n  display: flex;\n  align-items: flex-start;\n  flex-direction: row;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 751;\n  height: 394;\n}\n",
        panelType: 'css'
      },
      {
        panelName: 'index.jsx',
        panelType: 'js',
        panelValue:"'use strict';\n\nimport { createElement, Component, render } from 'rax';\nimport View from 'rax-view';\nimport View from 'rax-filter';\nimport Background from './background';\nimport Slider from './slider';\nimport Card from './card';\nimport TabHeader from './tabHeader';\nimport Listview from './listview';\nimport FloatingLayer from './floating-layer';\nimport BottomBar from './bottom-bar';\nimport styles from './index.css';\n\nconst print = function(value) {\n  console.log(value);\n};\nclass Index extends Component {\n  state = { data: [] };\n  constructor(props, context) {\n    super();\n    console.log('super props');\n  }\n  componentDidUpdate(prevProps, prevState, snapshot) {}\n  isReadCountShow(readCount) {\n    return readCount > 200;\n  }\n  render() {\n    return (\n      <View style={styles.bg}>\n        <Background />\n        <Slider />\n        <Card />\n        <TabHeader />\n        <Listview />\n        <FloatingLayer />\n        <BottomBar />\n      </View>\n    );\n  }\n}\nrender(<Index />);\n",
        panelImports: [
          "import View from 'rax-view'",
          "import Background from './background'",
          "import Slider from './slider'",
          "import Card from './card'",
          "import View from 'rax-filter'"
        ]
      },
      {
        panelName: 'index.css',
        panelValue:".bg1 {\n  display: flex;\n  align-items: flex-start;\n  flex-direction: row;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 751;\n  height: 394;\n}\n",
        panelType: 'css'
      },
    ],
    noTemplate: true
  }
};

