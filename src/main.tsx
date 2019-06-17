import React from 'react';
import ReactDOM from 'react-dom';
import { CanvasRenderer } from './domain/view/CanvasRenderer';
import { documentManager } from './domain/model/DocumentManager';
import { toolsManager } from './domain/tools/ToolsManager';

console.log(toolsManager.currentTool);

ReactDOM.render(
    <CanvasRenderer model={documentManager.canvas} />, 
    document.getElementById('app-container'));
