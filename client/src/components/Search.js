import React from 'react';

import {TextField} from '@material-ui/core'

export default function({onSearch})  {
    const [q, setQ] = React.useState('')

    function handle(evt) {
        setQ(evt.target.value)
    }

    return (
        <TextField  label="Search" fullWidth onChange={handle} onKeyPress={e => e.key==="Enter"?onSearch(q):null} value={q} />
    )
}