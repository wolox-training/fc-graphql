const { gql } = require('apollo-server');

const getAlbum = id => gql`
    query {
        getAlbum(id: ${id}) {
          id
          title
          artist
          photos{
              albumId
              id
              title
              url
              thumbnailUrl
          }
        }
      }`;

const getAlbums = (offset, limit, orderBy = null, filterBy = null) => gql`
  query {
    getAlbums(offset:${offset},limit:${limit}, 
      orderBy: "${orderBy ? orderBy : ''}", filterBy: "${filterBy ? filterBy : ''}") {
        id
        title
        artist
        photos{
            albumId
            id
            title
            url
            thumbnailUrl
        }
    }
  }
`;

module.exports = { getAlbum, getAlbums };
