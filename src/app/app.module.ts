import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [//指令、组件、管道
    AppComponent
  ],
  imports: [//依赖的组件
    CoreModule
  ],
  // providers:[],//存放服务
  bootstrap: [AppComponent]//入口的组件
})
export class AppModule { }
