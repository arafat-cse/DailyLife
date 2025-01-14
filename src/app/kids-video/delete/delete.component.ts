import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { KidsVideoService } from '../../services/kids-video.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  kidsVideoId!: string;
  private destory$:Subject<void> = new Subject<void>();
  constructor(private router:ActivatedRoute,
    private route: Router,
    private matSnackBar: MatSnackBar,
    private kidsVideoService:KidsVideoService){
    this.kidsVideoId = this.router.snapshot.paramMap.get("id") ||'';

      //Delete Functionality
      this.kidsVideoService.deleteKideVideo(this.kidsVideoId)
   
      .pipe(takeUntil(this.destory$))
      .subscribe(data =>{
     this.showSuccessMessage("Credit Card Deleted Successfully");
        
         this.route.navigate(['creditcards']);
      })
      alert("Credit Card Delelete Yes?");
  }
  showSuccessMessage(message: string){
    this.matSnackBar.open(message, 'close',{
      duration:3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
  ngOnDestory()
  {
    this.destory$.next();
    this.destory$.complete();
  }

}
