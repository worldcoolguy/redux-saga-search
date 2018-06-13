import axios from 'axios';

export const fetchGitAPI = (options) => {
    const keyword = options.payload.keyword;
    const searchtype = options.payload.searchtype;
    const url = (searchtype==='user') ? `https://api.github.com/users/${keyword}/repos`
		: `https://api.github.com/search/repositories?q=${keyword}`;
    console.log(url)
    return axios.get(url);
}
    
    