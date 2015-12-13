import React = require('react');
import {CanvasRenderer} from './domain/view/CanvasRenderer';
import {toolsManager} from './domain/tools/ToolsManager';
import {documentManager} from './domain/model/DocumentManager';

var tool = toolsManager.currentTool;
React.render(<CanvasRenderer model={documentManager.canvas} />, document.body);
