import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpService } from 'app/services/http/http.service';

@Injectable()
export class AvatarsService {
  API_URL = environment.AVATARS_ROOT;

  constructor(private http: HttpService) {}

  getAvatars() {
    const params = {
      method: 'GET',
      url: this.API_URL,
      path: ``
    };
    return this.http.invoke(params);
  }
}
