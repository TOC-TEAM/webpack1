// indexA.js
import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

console.log(_.join(['a', 'b'], '~'))

ReactDOM.render(<div>SplitChunk</div>, document.getElementById('root500'))
