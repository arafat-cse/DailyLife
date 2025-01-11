import { Component } from '@angular/core';
import { KidsVideoService } from '../../services/kids-video.service';
import { Route, Router } from '@angular/router';
// import { VideoList } from '../../interface/video-list';
// import { VideoList } from '../../interface/Post';
import { videoList } from '../../interface/video-list';
import { Subscription } from 'rxjs/internal/Subscription';
import { Client, Databases, ID } from "appwrite";
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {


  


  private subcription: Subscription | undefined;
  constructor(private KidsVideoService:KidsVideoService,
    private router:Router){

    }
    // newKidsVideo:VideoList={
    //   id: 0,
    //   videolink: "ff",
    //   description: "Hello",
    //   createDate: Date(),
    //   updateDate: Date(),
    // };
   newKidsVideo:videoList={
    id: "",
    userId:"",
    title: "",
    description: "",
    thumbnailUrl:"",
    videoUrl: "",
    categories:"",
    educationalTags:"",
    isFavorite:true,
    isFeatured:false,
    isActive:true,
    };

    CreatesVideoList:videoList[] = [];

    saveKidsVideo(){
  

         
        this.subcription = this.KidsVideoService.createKidsVideo(this.newKidsVideo).subscribe(data =>{
         
          
          this.router.navigate(['kids-video/view']);
       
       console.log(this.newKidsVideo);
      })
       
      
    }
    
}
