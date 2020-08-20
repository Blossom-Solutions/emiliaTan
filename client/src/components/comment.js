import React from 'react'
import {Card,CardHeader,CardContent,Avatar,Typography} from '@material-ui/core'


export default  Comment = ({comment}) => {
    return (
        <Card variant="outlined" style={{minWidth:'50vw',maxWidth:'60vw'}}>
            <CardHeader
            title={`@${comment.madeBy.name}`}
            avatar={<Avatar src={comment.madeBy.pic}/>}
            subheader={`Posted on: ${comment.madeBy.created.split('T')[0]}`}
            />
            <CardContent>
                <Typography /* style={{width:'200px'}} */ noWrap variant="body2">{comment.body}</Typography>
            </CardContent>
        </Card>
    )
}