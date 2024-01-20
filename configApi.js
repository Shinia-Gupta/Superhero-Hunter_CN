const apikey="785d6cfc0baa2c6003508224295e7d9c";
const hashValue="12432d19aa43d74fc916bab55423e81e";
let timestamp=1;
const url=`http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}`;
const url2=`http://gateway.marvel.com/v1/public/characters/`;

export {url,url2,apikey,timestamp,hashValue};
