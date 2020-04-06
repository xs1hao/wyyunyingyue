import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { playerReducer } from './reducers/player.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { memberReducer } from './reducers/member.reducer';



@NgModule({
  declarations: [],
  imports: [
    // 注册reducer 
    // forRoot()
    StoreModule.forRoot({ player: playerReducer, member: memberReducer }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    }),
    StoreDevtoolsModule.instrument({// 调试配置，这个需要浏览器安装插件配合使用；
      maxAge: 20,// 最多纪录20条数据
      logOnly: environment.production // 打印log
    })
  ]
})
export class AppStoreModule { }
