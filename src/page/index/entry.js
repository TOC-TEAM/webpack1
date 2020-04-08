// indexA.js
import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import './index.scss'
console.log(_.join(['a', 'b'], '~'))

ReactDOM.render(<div>SplitChunk</div>, document.getElementById('root'))
