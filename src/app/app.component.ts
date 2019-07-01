import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { DndDropEvent, DropEffect } from "ngx-drag-drop";
import { DndDragImageOffsetFunction } from "ngx-drag-drop";
import { ApiSrvc } from './api-srvc.service';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { CustomFilterPipe } from './custom-filter.pipe';

interface panelList {
  columns?: any[];
  designBlockTypeGuid: string;
  image: string;
  name: string;
  renderedHtml: string;
}

interface toolPanelObj {
  show?:boolean;
}
interface NestableListItemContainer {}
interface addonListObj {}
interface addonList {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit { //, AfterViewInit, AfterViewChecked
  title = 'Addon-List-Tool';
  @ViewChild('script') script: ElementRef;

  toolPanel = {
    show: false
  };
  nestableList: panelList[] = [];
  nestableListContainer: NestableListItemContainer[] = []; //array
  addonList: addonList[] = []; //array
  addonListObj = {};

  constructor(private apiSrvc: ApiSrvc) { }

  ngOnInit() {
      this.getPanelList();
      this.getAddonList();
  }

  // https://stackoverflow.com/questions/35186838/angular-access-scope-from-within-script-tag
  // https://stackoverflow.com/questions/48226868/document-getelementbyid-replacement-in-angular4-typescript?rq=1
  // https://stackoverflow.com/questions/42458346/need-to-insert-script-tag-in-angular-2
  // https://stackoverflow.com/questions/403967/how-may-i-reference-the-script-tag-that-loaded-the-currently-executing-script
  // https://github.com/NativeScript/NativeScript/issues/2380

  getPanelList():  void {
      this.apiSrvc.getMemberbossPanelList(parentContentGuid, parentRecordGuid)
      .subscribe(nestableList => {
        nestableList['addonPanelList'].forEach(obj => {
          obj.instanceGuid = ''
        })
        this.nestableList = nestableList['addonPanelList'];
      });
  }
  getAddonList():  void {
      this.apiSrvc.getMemberbossAddonList(parentContentGuid, parentRecordGuid)
      .subscribe(addonListObj => {
        delete addonListObj['errorList'];
        this.addonList = addonListObj['addonList'];
        this.addonListObj = addonListObj;
      });
  }

  private currentDraggableEvent:DragEvent;
  private currentDragEffectMsg:string;

  onDragStart( event:DragEvent) {
    this.currentDragEffectMsg = "";
    this.currentDraggableEvent = event;
  }

  onDragged( item:any, list:any[], effect:DropEffect ) {
    this.currentDragEffectMsg = `Drag ended with effect "${effect}"!`;
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }

  onDragEnd( event:DragEvent) {
    this.currentDraggableEvent = event;
  }

  onDrop( event:DndDropEvent, list?:any[] ) {
     this.nestableListContainer = list;

    if( list
      && (event.dropEffect === "copy"
        || event.dropEffect === "move") ) {

        // new
        var item = event.data;
        let isHtmlObj = false;
          if(item.columns) {
            item.columns.forEach(obj => {
              console.log(obj);
              if(!obj.addonList) {
                obj.addonList = [];
              }

            })
          }
          else {
            isHtmlObj = true;
          }

          //end new

        let index = event.index;

        if( typeof index === "undefined" ) {
          index = list.length;
        }

        list.splice( index, 0, event.data );

          console.log(this.addonListObj);

        this.apiSrvc.setMemberbossAddonList(this.addonListObj).subscribe(renderedItem => {
          console.log(renderedItem);
          if(isHtmlObj) {
            console.log(item);
            item.renderedHtml = renderedItem.renderedHtml;
          }
        });
    }

  }

}

export interface Config {
}
