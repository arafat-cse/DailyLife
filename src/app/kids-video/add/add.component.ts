// import { Component, OnInit } from '@angular/core';
// import { KidsVideoService } from '../../services/kids-video.service';
// import { Route, Router } from '@angular/router';
// // import { VideoList } from '../../interface/Post';
// import { videoList } from '../../interface/video-list';
// import { Subscription } from 'rxjs/internal/Subscription';
// import { Client, Databases, ID } from "appwrite";
// @Component({
//   selector: 'app-add',
//   templateUrl: './add.component.html',
//   styleUrl: './add.component.css'
// })
// export class AddComponent {

//   videoData: any;

  
// getYoutubeData(videoId: string)
// {
//   this.kidsVideoService.getVideoMetadata(videoId).subscribe((data) => {
//     this.videoData = data.items[0]; // API response is an array
//     console.log(this.videoData);
//   });
// }

//   private subcription: Subscription | undefined;
//   constructor(private kidsVideoService:KidsVideoService,
//     private router:Router){}

//     youtubeLink: string = '';
//   private API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your API key
//   private API_URL = 'https://www.googleapis.com/youtube/v3/videos';
//     // newKidsVideo:VideoList={
//     //   id: 0,
//     //   videolink: "ff",
//     //   description: "Hello",
//     //   createDate: Date(),
//     //   updateDate: Date(),
//     // };
//    newKidsVideo:videoList={
//     id: "",
//     userId:"",
//     title: "",
//     description: "",
//     thumbnailUrl:"",
//     videoUrl: "",
//     categories:"",
//     educationalTags:"",
//     isFavorite:true,
//     isFeatured:false,
//     isActive:true,
//     };

//     CreatesVideoList:videoList[] = [];
//     fetchMetadata() {
//       const videoId = this.extractVideoId(this.youtubeLink);
//       if (!videoId) {
//         alert('Invalid YouTube link!');
//         return;
//       }
  
//       this.http
//         .get(this., {
//           params: {
//             part: 'snippet,statistics',
//             id: videoId,
//             key: this.API_KEY,
//           },
//         })
//         .subscribe(
//           (response: any) => {
//             if (response.items.length > 0) {
//               this.videoData = response.items[0];
//             } else {
//               alert('Video not found!');
//             }
//           },
//           (error) => {
//             console.error('Error fetching video metadata:', error);
//           }
//         );
//     saveKidsVideo(){
  

         
//         this.subcription = this.kidsVideoService.createKidsVideo(this.newKidsVideo).subscribe(data =>{
         
          
//           this.router.navigate(['kids-video/view']);
       
//        console.log(this.newKidsVideo);
//       })
       
      
//     }
    
// }
import { Component } from '@angular/core';
import { KidsVideoService } from '../../services/kids-video.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { videoList } from '../../interface/video-list';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  youtubeLink: string = '';
  videoData: any = null;

  private API_KEY = 'AIzaSyBuFDktc6TgABzOVeuFsWrF7piuDu8AKrE'; // Replace with your API key
  private API_URL = 'https://www.googleapis.com/youtube/v3/videos';
  private subscription: Subscription | undefined;

  newKidsVideo: videoList = {
    id: '',
    userId: '',
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    categories: '',
    educationalTags: '',
    isFavorite: true,
    isFeatured: false,
    isActive: true
  };

  constructor(
    private kidsVideoService: KidsVideoService,
    private router: Router,
    private http: HttpClient
  ) {}

  extractVideoId(url: string): string | null {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  fetchMetadata() {
    const videoId = this.extractVideoId(this.youtubeLink);
    if (!videoId) {
      alert('Invalid YouTube link!');
      return;
    }

    this.http
      .get(this.API_URL, {
        params: {
          part: 'snippet,statistics',
          id: videoId,
          key: this.API_KEY
        }
      })
      .subscribe(
        (response: any) => {
          if (response.items.length > 0) {
            this.videoData = response.items[0];
            this.newKidsVideo.title = this.videoData.snippet.title;
            this.newKidsVideo.description = this.videoData.snippet.description;
            this.newKidsVideo.thumbnailUrl = this.videoData.snippet.thumbnails.high.url;
            this.newKidsVideo.videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
            console.log(this.newKidsVideo);
          } else {
            alert('Video not found!');
          }
        },
        (error) => {
          console.error('Error fetching video metadata:', error);
        }
      );
  }

  saveKidsVideo() {
    if (!this.newKidsVideo.title || !this.newKidsVideo.videoUrl) {
      alert('Metadata is missing. Fetch metadata before saving.');
      return;
    }

    this.subscription = this.kidsVideoService.createKidsVideo(this.newKidsVideo).subscribe(
      (data) => {
        console.log('Video saved successfully:', data);
        this.router.navigate(['kids-video/view']);
      },
      (error) => {
        console.error('Error saving video:', error);
      }
    );
  }
}
