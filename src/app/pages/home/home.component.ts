import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner, HotTag, SongSheet, Singer } from '../../services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { SheetService } from 'src/app/services/sheet.service';
import { BatchActionsService } from '../../store/batch-actions.service';
import { ModalTypes } from '../../store/reducers/member.reducer';
import { User } from 'src/app/services/data-types/member.type';
import { AppStoreModule } from '../../store/index';
import { Store, select } from '@ngrx/store';
import { getUserId, getMember } from '../../store/selectors/member.selector';
import { MemberService } from 'src/app/services/member.service';
import { SetUserId } from 'src/app/store/actions/member.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[];
  hotTags: HotTag[];
  songSheetList: SongSheet[];
  singers: Singer[];
  user: User;

  // 拿到轮播组件的实例，以便调用他的方法 onChangeSlide()
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(
    private route: ActivatedRoute,//使用路由守卫
    private router: Router,
    private sheetServe: SheetService,
    private batchActionsServe: BatchActionsService,
    private store$: Store<AppStoreModule>,
    private memberServe: MemberService,
  ) {
    // 通过路由守卫获取的数据
    // console.log('route.data:',this.route.data); 
    this.route.data.pipe(map(res => res.homeDatas)).subscribe(([banners, hotTags, songSheetList, singers]) => {
      this.banners = banners;
      this.hotTags = hotTags;
      // debugger
      this.songSheetList = songSheetList;
      this.singers = singers;
    });
    this.store$.pipe(select(getMember), select(getUserId)).subscribe(id => {
      if (id) {
        this.getUserDetail(id);
      } else {
        this.user = null;
      }
    });
  }

  ngOnInit() {
  }

  private getUserDetail(id: string) {
    this.memberServe.getUserDetail(id).subscribe(user => this.user = user);
  }

  onBeforeChange({ to }) {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }


  onPlaySheet(id: number) {
    this.sheetServe.playSheet(id).subscribe(list => {
      this.batchActionsServe.selectPlayList({ list, index: 0});
    });
  }

  toInfo(id: number) {
    this.router.navigate(['/sheetInfo', id]);
  }

  openModal() {
    this.batchActionsServe.controlModal(true, ModalTypes.Default);
  }
}
