import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { KidsVideoService } from '../../services/kids-video.service';
import { videoList } from '../../interface/video-list';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {
  kidsVideoDetails: videoList[] = [];
  dataSource = new MatTableDataSource<videoList>(this.kidsVideoDetails);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private kidsVideoService: KidsVideoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchVideos();
  }

  // Fetch all videos from the database
  fetchVideos(): void {
    this.kidsVideoService.getKidsVideo().subscribe({
      next: (videos) => {
        this.kidsVideoDetails = videos;
        this.dataSource.data = this.kidsVideoDetails;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching videos:', err);
      },
    });
  }

  // Delete a specific video by document ID
  delete(documentId: string): void {
    this.kidsVideoService.deleteKideVideo(documentId).subscribe({
      next: () => {
        console.log('Document deleted successfully');
        this.showSuccessMessage('Document deleted successfully');
        // Update the table after deletion
        this.kidsVideoDetails = this.kidsVideoDetails.filter(
          (doc) => doc.$id !== documentId
        );
        this.dataSource.data = this.kidsVideoDetails;
      },
      error: (err) => {
        console.error('Error deleting document:', err);
        this.showErrorMessage('Error deleting document');
      },
    });
  }

  // Show success message
  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  // Show error message
  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar'],
    });
  }

}
