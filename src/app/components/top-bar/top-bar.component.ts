import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.sass',
  standalone: false,
})
export class TopBarComponent {
  @Output() tabChanged = new EventEmitter<number>(); // Emit active tab ID
  @Output() tabAdded = new EventEmitter<{ id: number; name: string }>();

  tabs: { id: number; name: string }[] = [  // List of tabs
    { id: 0, name: 'Home' } // Predefine the Home tab with ID 0
  ]; 
  selectedTabIndex = 0; // Track the index of the active tab
  private tabIdCounter = 0; // To assign unique IDs to tabs
  isLoggedIn: boolean = false;
 
  
  constructor(private dialog: MatDialog) {}


  //Tabs BAr Dynamics
      // Add a new tab
  addTab(name: string) {
    const newTab = { id: this.tabIdCounter++, name };
    this.tabs.push(newTab);
    this.selectedTabIndex = this.tabs.length - 1; // Automatically switch to the new tab
    this.tabAdded.emit(newTab); // Emit new tab details
  }

      // Remove a tab
  removeTab(tabId: number) {
    this.tabs = this.tabs.filter(tab => tab.id !== tabId);
    if (this.selectedTabIndex === tabId) {
      this.selectedTabIndex = 0; // Switch back to Home if the removed tab was active
    }
  }

  // Switch tabs by index
  selectTabByIndex(index: number) {
    this.selectedTabIndex = index;
    const selectedTab = this.tabs[index];
    this.tabChanged.emit(selectedTab.id); // Emit the new active tab ID
  }

  
  //Log In Dynamics
  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoggedIn = true; // Assume login success
      }
    });
  }
}
