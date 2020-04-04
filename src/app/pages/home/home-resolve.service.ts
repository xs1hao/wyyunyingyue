import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';
import { Banner, SongSheet, Singer, HotTag } from '../../services/data-types/common.types';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/internal/operators';

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]];

@Injectable()
// 路由守卫
export class HomeResolverService implements Resolve<HomeDataType> {
  constructor(
    private homeServe: HomeService,
    private singerServe: SingerService
  ) {}
  resolve(): Observable<HomeDataType> {
    // forkJoin: 和promise 中的 all类似
    return forkJoin([
      this.homeServe.getBanners(),
      this.homeServe.getHotTags(),
      this.homeServe.getPerosonalSheetList(),
      this.singerServe.getEnterSinger()
      // first() 取第一个流；pipe 操作符
    ]).pipe(first());
  }
}
