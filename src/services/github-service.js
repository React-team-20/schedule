export default class GithubService {
  getUserData = async name => {
    const res = await fetch(`https://api.github.com/user?q=${name}`);
    const data = await res.json();
    return data;
  };
}  