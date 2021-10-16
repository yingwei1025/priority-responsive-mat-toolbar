import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

/**
 * @title Toolbar overview
 */
@Component({
  selector: 'toolbar-overview-example',
  templateUrl: 'toolbar-overview-example.html',
  styleUrls: ['toolbar-overview-example.css'],
})
export class ToolbarOverviewExample implements AfterViewInit {
  @ViewChild('mainToolbar') mainToolbar: ElementRef;
  toolbarListItems = [
    { menuIcon: 'add' },
    { menuIcon: 'shopping_cart' },
    { menuIcon: 'favorite' },
    { menuIcon: 'share' },
    { menuIcon: 'shopping_basket' },
    { menuIcon: 'library_books' },
    { menuIcon: 'dialpad' },
    { menuIcon: 'voicemail' },
    { menuIcon: 'delete' },
    { menuIcon: 'settings' },
    { menuIcon: 'people' },
    { menuIcon: 'help' },
  ];
  popupListItems = [] as any;

  width: number = 0;
  currentToolbarWidth = 0;
  currentSpaceUsed = 0;
  // fixed width for more button
  moreBtnWidth = 40;
  // width for very last right button on mattoolbar
  lastButtonSize = 64;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // adjust the toolbar based on logic
    setTimeout(() => {
      this.adjustToolBar();
    }, 100);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    const tempWidth = this.getToolbarSize();
    this.currentToolbarWidth = tempWidth;
    setTimeout(() => {
      this.initAdjustSize();
    }, 0);
  }

  public getToolbarSize(): number {
    let width = this.mainToolbar.nativeElement.offsetWidth;
    return width;
  }

  public adjustToolBar(): void {
    // reset 0
    this.currentSpaceUsed = 0;
    this.currentToolbarWidth = this.getToolbarSize();

    // if got more button then add the fixed button size else init to 0
    let tempExistUsedUpWidth = 0;
    this.toolbarListItems.forEach(function (x, i) {
      const element = document.getElementById(x.menuIcon)?.offsetWidth;
      // sum up the current exist width

      if (element !== null && element !== 0) {
        tempExistUsedUpWidth += Number(element);
      }
    });

    this.currentSpaceUsed =
      tempExistUsedUpWidth +
      (this.popupListItems.length > 0 ? this.moreBtnWidth : 0);

    if (this.currentToolbarWidth < this.currentSpaceUsed) {
      this.addItemToPopup();
    } else if (
      this.currentSpaceUsed + this.lastButtonSize < this.currentToolbarWidth &&
      this.popupListItems.length
    ) {
      this.removeItemFromPopup();
    }
  }

  public initAdjustSize(): void {
    // reset 0
    this.currentSpaceUsed = 0;
    this.currentToolbarWidth = this.getToolbarSize();

    // if got more button then add the fixed button size else init to 0
    let tempExistUsedUpWidth = 0;
    let howManyFit = 0;

    for (let i = 0; i < this.toolbarListItems.length; i++) {
      const element = document.getElementById(
        this.toolbarListItems[i].menuIcon
      )?.offsetWidth;

      // check how many button fit
      if (
        element !== null &&
        element !== 0 &&
        tempExistUsedUpWidth < this.currentToolbarWidth - this.moreBtnWidth
      ) {
        // sum up the current exist width
        tempExistUsedUpWidth += Number(element);
        howManyFit = i;
      }
    }
    let howManyAddToPop = this.toolbarListItems.length - (howManyFit + 1);
    console.log(this.toolbarListItems.length, howManyFit + 1 ,howManyAddToPop)

    // add to the pop list based on calculation
    if(howManyAddToPop != 0){
      for (let i = 0; i <= howManyAddToPop; i++) {
      this.addItemToPopup();
      }
    }
  }

  public clickMenuItem(menuItem: any): void {
    console.log(menuItem);
  }

  public addItemToPopup(): void {
    if (this.toolbarListItems.length > 0) {
      const tempLastItem =
        this.toolbarListItems[this.toolbarListItems.length - 1];
      this.toolbarListItems.pop();

      this.popupListItems.push(tempLastItem);
    }
  }

  public removeItemFromPopup(): void {
    if (this.popupListItems.length > 0) {
      const tempLastItem = this.popupListItems[this.popupListItems.length - 1];
      this.popupListItems.pop();
      this.toolbarListItems.push(tempLastItem);
    }
  }
}
