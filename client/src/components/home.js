import React from 'react';
import PostComponent from './PostComponent.js'
import {Grid} from '@material-ui/core';
import Pagination from './pagination';
import NotFound from '../notFound'

function HookedHome({query,usr}) {
    const [results, setResults] = React.useState([])
    const [currentPage,setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(10)

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = results.slice(indexOfFirstPost,indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    
    
    const onDelete = (del)=>{
        results.splice(results.indexOf(del),1)
        setResults(results)
    }
    
    React.useEffect(() => {
        console.log(query)
        var search = false
        var endpoint = '/api/home'
        if (query !== '') {
            search = true
            endpoint = `/api/search?q=${query}`
        }
        fetch(endpoint).then(f => 
            f.ok?
                f.json().then(r => setResults(() => search?r.results:r))
                :setResults(() => [])
        )
    }, [setResults, query])

    return (
        <Grid container spacing={2} direction="row" 
        alignItems="center"
        > 
            {currentPosts.length?currentPosts.map(post =>
                <PostComponent handleDel={onDelete} usr={usr} post={post}  key={post._id?post._id:post.id}/>
            ):<Grid item style={{margin:'0 0 0 50vw'}}><NotFound style={{margin:'0 auto'}}></NotFound></Grid>}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={results.length}
                paginate={paginate}
            />
        </Grid>
    )
}
export default HookedHome;
