import { Component } from '@angular/core';
import { KidsVideoService } from '../../services/kids-video.service';
import { Route, Router } from '@angular/router';
// import { VideoList } from '../../interface/video-list';
import { VideoList } from '../../interface/Post';
import { Subscription } from 'rxjs/internal/Subscription';

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
   newKidsVideo:VideoList={
    userId: "",
    title: "",
    body: "",
    };

    CreatesVideoList:VideoList[] = [];

    saveKidsVideo(){
      this.KidsVideoService.getKidsVideo().subscribe((data:VideoList[])=>{
        this.CreatesVideoList = data;
        //this.newKidsVideo.id = this.CreatesVideoList.length+1;
        this.subcription = this.KidsVideoService.createKidsVideo(this.newKidsVideo).subscribe(data =>{
          //alert("Create Card add");
          
          this.router.navigate(['video List']);
        })
       console.log(this.newKidsVideo);
      })
       
      
    }
    
}
