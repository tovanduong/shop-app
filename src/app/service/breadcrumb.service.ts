import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  breadcrumbs: Observable<BreadcrumbItem[]> =
    this.breadcrumbsSubject.asObservable();

  constructor() {}

  setBreadcrumbs(breadcrumbs: BreadcrumbItem[]) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }
}
