import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { VideoList} from '../interface/video-list'
import { environment } from '../../../src/environments/environment';
import { VideoList} from '../interface/Post'
import { from, map, Observable } from 'rxjs';
import { Client, Databases, ID, Query } from 'appwrite';

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

  private apiUrl ="https://jsonplaceholder.typicode.com/posts";
 

  //   return from (documentPromise);
  // }
  createKidsVideo(VideoList: VideoList): Observable<VideoList> {
    const databaseId = environment.appwrite.databaseId;
    const collectionId = environment.appwrite.collectionId;
    return from(
      
      this.databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          userId: VideoList.userId,
          title: VideoList.title,
          body: VideoList.body,
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

  //Get All Kids Video
  // getKidsVideo():Observable<VideoList[]>{
    
  //   return this.httpClient.get<VideoList[]>(this.apiUrl);
  // }
  getKidsVideo(): Observable<VideoList[]> {
    const databaseId = environment.appwrite.databaseId;
    const collectionId = environment.appwrite.collectionId;
    return from(
      this.databases.listDocuments(databaseId, collectionId,[Query.orderDesc('$createdAt'),])
    ).pipe(
      map((response: any) => {
        // Map the response to the desired type if needed
        return response.documents as VideoList[];
      })
    );
  }
  
  // getPostData():Observable<VideoList[]>{
  //   return this.httpClient.get<VideoList[]>(this.apiUrl);
  // }
  //Get Specific id Kids Video
  getKidsVideoId(id:number):Observable<VideoList>{
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<VideoList>(url);
  }

  //update Functionality
  updateKidsVideo(VideoList:VideoList):Observable<VideoList>{
    const url = `${this.apiUrl}/${VideoList.userId}`
    return this.httpClient.put<VideoList>(url,VideoList);
  }

  //delete Functionality
  deleteKideVideo(id:number):Observable<void>
  {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }



}
