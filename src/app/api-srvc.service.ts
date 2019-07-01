import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddonObj } from './observableObjects';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpGetOptions  = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  ),
  withCredentials: true
};

const httpPostOptions =
{
    headers: new HttpHeaders (
        {
            "Content-Type": "application/x-www-form-urlencoded"
        }),
    withCredentials: true,
};

let locationURL =  '';
if(window.location.hostname === 'localhost') {
  locationURL =  'http://memberboss.com';
}
else {
  locationURL =  '';
}

@Injectable({
  providedIn: 'root'
})

export class ApiSrvc {

  constructor(private http: HttpClient) { }

  getMemberbossPanelList(parentContentGuid, parentRecordGuid) {
    return this.http.post(locationURL+'/getaddonPanellist', {
        "parentContentGuid":parentRecordGuid,
        // "parentRecordGuid":"{925F4A57-32F7-44D9-9027-A91EF966FB0D}"
        "parentRecordGuid":parentContentGuid
      }, httpGetOptions)
      .pipe();
  }

  getMemberbossAddonList(parentContentGuid, parentRecordGuid) {
    return this.http.post(locationURL+'/getAddonList', {
        "parentContentGuid":parentRecordGuid,
        "parentRecordGuid":parentContentGuid,
        // "parentRecordGuid":"{fc7bfeeb-c245-4bda-a552-c3fd413f7493}",
        "includeRenderedHtml": true
      }, httpGetOptions)
      .pipe();
  }

  setMemberbossAddonList(data) {
    return this.http.post(locationURL+'/setAddonList', data, httpGetOptions)
  }

}
