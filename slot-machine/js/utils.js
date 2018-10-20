export default {
    async fetchFrom(uri){

        let result = await fetch(uri);

        return {
            result,
            json: await result.json()
        };
        
    }    
};