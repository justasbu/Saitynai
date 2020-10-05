import axios from 'axios'

const url = 'api/providers';

class ProviderService{
    //Get Providers
    static getProviders() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(provider => ({
                        ...provider,
                        createdAt: new Date(provider.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    //Create Provider
    static insertProvider(text){
        return axios.post(url,{
            text
        });
    }
    //Delete Provider

    static deleteProvider(id){
        return axios.delete(`${url}${id}`)
    }

}

export default ProviderService;