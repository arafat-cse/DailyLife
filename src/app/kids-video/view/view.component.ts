import { Component, ViewChild } from '@angular/core';
import { VideoList } from '../../interface/Post';
import { Subject, takeUntil } from 'rxjs';
import { KidsVideoService } from '../../services/kids-video.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  kidsVideoDetails:VideoList[]=[];

  private destory$:Subject<void> = new Subject<void>();

  constructor(private KidsVideoService:KidsVideoService,
    private router:ActivatedRoute,
    private matSnackBar:MatSnackBar){

    
      this.KidsVideoService.getKidsVideo()
      .pipe(takeUntil(this.destory$)).subscribe((data:VideoList[])=>{
        this.showSuccessMessage("Credit Card Loaded Successfully")
      this.kidsVideoDetails = data;
      this.dataSource = new MatTableDataSource(this.kidsVideoDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      })
    }
    dataSource = new MatTableDataSource(this.kidsVideoDetails);
    displayColumns = ["userId","title","body"]


    selection = new SelectionModel(true,[]);
  
  
    showSuccessMessage(message: string){
      this.matSnackBar.open(message, 'close',{
        duration:3000,
      })
    }
    ngOnDestory(){
      this.destory$.next();
      this.destory$.complete();
    }
    
    
  // Corrected ViewChild decorators:
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
}
