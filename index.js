/**
 * @name plugin directory
 * @param option: { data, filePath, config }
 * - data: module and generate code Data
 * - filePath: Pull file storage directory
 * - config: cli config
 */

const fs = require('fs-extra');
const path = require('path');

function replaceLocalImports(panelValue, imports, fileName) {
  let replacement = '../';
  if (fileName === 'index') {
    replacement = './components/';
  }
  imports.forEach(item => {
    const newItem = item.replace('./', replacement);
    panelValue = panelValue.replace(item, newItem);
  });
  return panelValue;
}

function replaceCssImport(panelValue, fileName) {
  panelValue = panelValue.replace(
    `import styles from './${fileName}.css';`,
    `import styles from './index.css';`
  );
  return panelValue;
}

function collectImports(imports, panelImports) {
  const realImports = panelImports
    .filter(item => {
      return item.indexOf('./') === -1;
    })
    .concat(imports);
  return Array.from(new Set(realImports));
}

function getPageName(data) {
  if (data && data.moduleData) {
    if (data.moduleData.name) {
      return data.moduleData.name;
    } else if (data.moduleData.id) {
      return 'page' + data.moduleData.id;
    }
  }
  return 'page';
}

const pluginHandler = async options => {
  let { config, filePath, data } = options;
  let imports = [];
  let result = {
    errorList: []
  };

  let pageDirectory = filePath;
  try {
    const pageName = getPageName(data);
    pageDirectory = path.resolve(filePath, `src/pages/${pageName}`);
    fs.ensureDirSync(pageDirectory);
  } catch (error) {
    result.errorList.push(error);
  }
  try {
    const panelDisplay = data.code.panelDisplay;
    for (const item of panelDisplay) {
      let { panelName, panelValue, panelImports = [] } = item;
      let filePath = '';
      let errorMsg = '';
      const fileName = panelName.split('.')[0];
      const fileType = panelName.split('.')[1];
      if (fileName !== 'index') {
        filePath = path.resolve(pageDirectory, 'components', fileName, `index.${fileType}`);
        errorMsg = `已存在名为 ${panelName} 的模块，跳过代码生成`;
      } else {
        filePath = path.resolve(pageDirectory, `index.${fileType}`);
        errorMsg = `已存在名为 ${panelName} 的主文件，跳过代码生成`;
      }
      if (!fs.pathExistsSync(filePath)) {
        panelValue = replaceCssImport(panelValue, fileName);
        panelValue = replaceLocalImports(panelValue, panelImports, fileName);
        fs.outputFileSync(filePath, panelValue);
      } else {
        result.errorList.push(new Error(errorMsg));
      }
      imports = collectImports(imports, panelImports);
    }
  } catch (error) {
    result.errorList.push(error);
  }
  const packages = imports.map(item => {
    return item.match(/\'(.*)?\'/g)[0].slice(1, -1);
  });
  return options;
};

module.exports = (...args) => {
  return pluginHandler(...args).catch(err => {
    console.log(err);
  });
};
