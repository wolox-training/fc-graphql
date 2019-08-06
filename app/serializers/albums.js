exports.albumInformation = albums =>
  albums.map(album => ({
    id: album.id,
    title: album.title,
    artist: album.userId
  }));
