import fetch from 'isomorphic-fetch';

async function getPost(){
    const rs = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await rs.json()
}

export default getPost;