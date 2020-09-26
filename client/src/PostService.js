import axios from 'axios'

const url = 'api/posts/';

class PostService {
    // Get Posts
 
    static getPosts() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }

    // Create Posts
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    //Delte Posts
    static deletePost(id){
        return axios.delete(`${url}${_id}`)
    }
}

export default PostService;