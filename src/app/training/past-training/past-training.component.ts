import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort)
  headerSort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;


  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private pastExercisesSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.pastExercisesSubscription = this.trainingService.pastExercises.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.retrievePastExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.headerSort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.pastExercisesSubscription) {
      this.pastExercisesSubscription.unsubscribe();
    }
  }

  doFilter(filterName: string) {
    this.dataSource.filter = filterName.trim().toLowerCase();
  }
}
