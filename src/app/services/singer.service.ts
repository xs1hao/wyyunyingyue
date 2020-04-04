import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Singer, SingerDetail } from './data-types/common.types';

// angular的某个库依赖了query-string
import queryString from 'query-string';

// 请求接口的参数类型
interface SingerParams {
  offset: number;
  limit: number;
  cat?: string;
}

// 默认的参数
const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
};

@Injectable({
  providedIn: ServicesModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }

  // queryString 方法的解读...（参考下面的地址）
  // https://www.cnblogs.com/whiteMu/p/5986297.html
  // stringify这个方法是将一个对象序列化成一个字符串，与querystring.parse相对。
  
  getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get(this.uri + 'artist/list', { params })
    .pipe(map((res: { artists: Singer[] }) => res.artists));
  }

  // 获取歌手详情和热门歌曲
  getSingerDetail(id: string): Observable<SingerDetail> {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.uri + 'artists', { params })
      .pipe(map(res => res as SingerDetail));
  }


  // 获取相似歌手
  getSimiSinger(id: string): Observable<Singer[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.uri + 'simi/artist', { params })
      .pipe(map((res: { artists: Singer[] }) => res.artists));
  }
}
