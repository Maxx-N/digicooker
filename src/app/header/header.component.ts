// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected: EventEmitter<string> = new EventEmitter<string>();
  collapsed = true;
  constructor(private dataStorageService : DataStorageService) {}
  ngOnInit(): void {}

  onSaveData() : void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() : void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  // onSelect(feature: string): void {
  //   this.featureSelected.emit(feature);
  // }
}
