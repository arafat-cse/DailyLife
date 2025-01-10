import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VideoList} from '../interface/video-list'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KidsVideoService {

  private apiUrl ="http://localhost:3000/Creditcards";
  constructor(private httpClient:HttpClient ) { }
  
  //Crud Funtionallity
  //Create new kidsVideo
  createKidsVideo( VideoList: VideoList): Observable<VideoList>{
    return this.httpClient.post<VideoList>(this.apiUrl,VideoList);
  }

  //Get All Kids Video
  getKidsVideo():Observable<VideoList[]>{
    return this.httpClient.get<VideoList[]>(this.apiUrl);
  }

  //Get Specific id Kids Video
  getKidsVideoId(id:number):Observable<VideoList>{
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<VideoList>(url);
  }

  //update Functionality
  updateKidsVideo(VideoList:VideoList):Observable<VideoList>{
    const url = `${this.apiUrl}/${VideoList.id}`
    return this.httpClient.put<VideoList>(url,VideoList);
  }

  //delete Functionality
  deleteKideVideo(id:number):Observable<void>
  {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }



}
