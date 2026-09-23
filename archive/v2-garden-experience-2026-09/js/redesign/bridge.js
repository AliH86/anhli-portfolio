/* UI adapter only. The existing catalog and single audio element own playback. */
(function(){
  if(!document.documentElement.classList.contains('dg-enabled')) return;
  const media=document.getElementById('audioEl');
  window.DandelionMusic={
    ready:Promise.resolve(window.portfolioCatalogReady), media,
    albums:()=>ALBUMS.map(a=>({...a,cover:coverUrl(a.cover)})),
    select(id){const i=ALBUMS.findIndex(a=>a.id===id);if(i>=0)selectAlbum(i,true);},
    play(id,track){const i=ALBUMS.findIndex(a=>a.id===id);if(i<0)return;if(curAlbum!==i)selectAlbum(i,true);if(shuffleOn)toggleShuffle();playAt(track,i);},
    toggle(){togglePlay();}, next(){nextTrack();}, previous(){prevTrack();},
    state(){const a=ALBUMS[activeAlbum],t=a?.tracks?.[activeIdx];return {albumId:a?.id,album:a?.name,trackId:t?.id,title:t?.name,playing:!media.paused&&!media.ended,muted:media.muted,time:media.currentTime,duration:media.duration};},
  };
})();
