import { createAction, props } from '@ngrx/store';
import { Song } from '../../services/data-types/common.types';
import { PlayMode } from '../../share/wy-ui/wy-player/player-type';
import { CurrentActions } from '../reducers/player.reducer';


/***
 * 定义一系列的动作
 * createAction 创建动作
 * 第一个参数：字符串的标识符；语义化我们是要做什么 [player] 模块
 * props: 接受一个对象；
 */
export const SetPlaying = createAction('[player] Set playing', props<{ playing: boolean }>());
export const SetPlayList = createAction('[player] Set playList', props<{ playList: Song[] }>());
export const SetSongList = createAction('[player] Set songList', props<{ songList: Song[] }>());
export const SetPlayMode = createAction('[player] Set playMode', props<{ playMode: PlayMode }>());
export const SetCurrentIndex = createAction('[player] Set currentIndex', props<{ currentIndex: number }>());
export const SetCurrentAction = createAction('[player] Set currentAction', props<{ currentAction: CurrentActions }>());
