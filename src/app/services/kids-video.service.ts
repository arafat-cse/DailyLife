import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { VideoList} from '../interface/video-list'
import { environment } from '../../../src/environments/environment';
// import { VideoList} from '../interface/Post'
import { videoList } from '../interface/video-list';
import { from, map, Observable } from 'rxjs';
import { Client, Databases, ID, Query } from 'appwrite';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class KidsVideoService {

  private client: Client;
  private databases: Databases;
  constructor(private httpClient:HttpClient) {
    // Initialize Appwrite client
    this.client = new Client();
    this.client
      .setEndpoint(environment.appwrite.endpoint) // Set the endpoint from environment
      .setProject(environment.appwrite.projectId); // Set the project ID from environment

    this.databases = new Databases(this.client);
  }
  private API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your API key
  private BASE_URL = 'https://www.googleapis.com/youtube/v3/videos';

 

  getVideoMetadata(videoId: string): Observable<any> {
    const params = {
      part: 'snippet,contentDetails,statistics',
      id: videoId,
      key: this.API_KEY,
    };
    return this.httpClient.get(this.BASE_URL, { params });
  }
  private apiUrl ="https://jsonplaceholder.typicode.com/posts";
 

  //   return from (documentPromise);
  // }
  createKidsVideo(VideoList: videoList): Observable<videoList> {
    const databaseId = environment.appwrite.databaseId;
    const collectionId = environment.appwrite.collectionId;
    return from(
      
      this.databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          id: VideoList.id,
          userId: VideoList.userId,
          title: VideoList.title,
          categories: VideoList.categories,
          description: VideoList.description,
       
         
          // body: VideoList.body,
        }
      )
    ).pipe(
      map((response: any) => {
        // Map the response to the desired structure, if needed
        return {
          ...VideoList,
          documentId: response.$id, // Example: attach document ID to VideoList
        };
      })
    );
  }

  getKidsVideo(): Observable<videoList[]> {
    const databaseId = environment.appwrite.databaseId;
    const collectionId = environment.appwrite.collectionId;
    return from(
      this.databases.listDocuments(databaseId, collectionId,[Query.orderDesc('$createdAt'),])
    ).pipe(
      map((response: any) => {
        // Map the response to the desired type if needed
        return response.documents as videoList[];
      })
    );
  }
  
  // getPostData():Observable<VideoList[]>{
  //   return this.httpClient.get<VideoList[]>(this.apiUrl);
  // }
  //Get Specific id Kids Video
  getKidsVideoId(id:number):Observable<videoList>{
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<videoList>(url);
  }

  //update Functionality
  updateKidsVideo(VideoList:videoList):Observable<videoList>{
    const url = `${this.apiUrl}/${VideoList.userId}`
    return this.httpClient.put<videoList>(url,VideoList);
  }

  //delete Functionality
  deleteKideVideo(id:number):Observable<void>
  {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }



}
