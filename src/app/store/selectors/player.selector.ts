import { PlayState } from '../reducers/player.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';


// 拿到state里面所有的数据
const selectPlayerStates = (state: PlayState) => state;
// createFeatureSelector 
export const getPlayer = createFeatureSelector<PlayState>('player');
// 获取playing的selector
export const getPlaying = createSelector(selectPlayerStates, (state: PlayState) => state.playing);
export const getPlayList = createSelector(selectPlayerStates, (state: PlayState) => state.playList);
export const getSongList = createSelector(selectPlayerStates, (state: PlayState) => state.songList);
export const getPlayMode = createSelector(selectPlayerStates, (state: PlayState) => state.playMode);
export const getCurrentIndex = createSelector(selectPlayerStates, (state: PlayState) => state.currentIndex);
export const getCurrentAction = createSelector(selectPlayerStates, (state: PlayState) => state.currentAction);

    // 拿到当前正在播放的歌曲
export const getCurrentSong = createSelector(selectPlayerStates, ({ playList, currentIndex }: PlayState) => playList[currentIndex]);

