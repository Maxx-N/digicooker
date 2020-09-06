// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected: EventEmitter<string> = new EventEmitter<string>();
  collapsed = true;
  private userSubscription: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  // onSelect(feature: string): void {
  //   this.featureSelected.emit(feature);
  // }
}
