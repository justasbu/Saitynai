import axios from 'axios'

const url = '/posts/';

class PostService {
    // Get Posts

    static getPosts() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        text,
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
    static deletePost(_id){
        return axios.delete(`${url}${_id}`)
    }
}

export default PostService;