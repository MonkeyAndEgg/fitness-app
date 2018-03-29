import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort)
  headerSort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;


  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getPastExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.headerSort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterName: string) {
    this.dataSource.filter = filterName.trim().toLowerCase();
  }
}
