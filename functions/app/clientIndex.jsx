import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.hydrate(<App isServerRendered={false} />, document.getElementById('root'));