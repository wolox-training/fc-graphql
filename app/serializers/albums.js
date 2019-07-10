exports.photosForAlbums = (album, photos) => ({
  id: album.id,
  title: album.title,
  artist: album.userId,
  photos
});
