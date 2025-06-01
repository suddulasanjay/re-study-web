import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SubjectService } from '../../../shared/services/subject.service';
import { CategoryService } from '../../../shared/services/category.service';
import { ConceptService } from '../../../shared/services/concept.service';

@Component({
  selector: 'app-schedule-landing',
  standalone : true,
  imports: [MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatMenuModule,CommonModule,FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './schedule-landing.component.html',
  styleUrls: ['./schedule-landing.component.scss']
})
export class ScheduleLandingComponent{
  private _subjectService = inject(SubjectService);
  private _categoryService = inject(CategoryService);
  private _conceptService = inject(ConceptService);
  private RANDOM_IMAGE_COUNT: Record<'subjects' | 'categories' | 'concepts', number> = {
    subjects: 0,       // No random images in subjects, only named
    categories: 7,
    concepts: 7,
  };
  private imageMap: Record<'categories' | 'concepts', Map<string, number>> = {
    categories: new Map(),
    concepts: new Map()
  };
  searchTerm: string = '';

  subjects = [
    { id: 1, name: 'Maths', icon: 'calculate' },
    { id: 2, name: 'Science', icon: 'science' }
  ];

  categories = [
    { id: 11, name: 'Algebra', subjectId: 1 },
    { id: 12, name: 'Physics', subjectId: 2 }
  ];

  concepts = [
    { id: 101, name: 'Quadratic Equations', categoryId: 11 },
    { id: 102, name: 'Newton’s Laws', categoryId: 12 }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getSubjects();
    this.getCategories();
    this.getConcepts();
  }

  getSubjects() {
    this._subjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects.map(subject => ({ id : subject.id, name: subject.name, icon: subject.name.toLowerCase() }));
    })
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(categories => {
      this.categories = categories.map(category => ({ id : category.id, name: category.name, subjectId: category.subjectId ?? 0 }));
    })
  }

  getConcepts() {
    this._conceptService.getConcepts().subscribe(concepts => {
      this.concepts = concepts.map(concept => ({ id : concept.id, name: concept.name, categoryId: concept.categoryId ?? 0 }));
    })
  }

  goToSubject(id: number) {
    this.router.navigate(['/schedule/subject', id]);
  }

  goToCategory(id: number) {
    this.router.navigate(['/schedule/category', id]);
  }

  goToConcept(id: number) {
    this.router.navigate(['/schedule/concept', id]);
  }

  createSubject() {
    this.router.navigate(['/schedule/subject/add']);
  }

  createCategory() {
    this.router.navigate(['/schedule/category/add']);
  }

  createConcept() {
    this.router.navigate(['/schedule/concept/add']);
  }

  matchesSearch(text: string): boolean {
    return text.toLowerCase().includes(this.searchTerm.toLowerCase());
  }

  getImageUrl(type: 'subjects' | 'categories' | 'concepts', name: string): string {
    const basePath = `/assets/images/covers/${type}`;
    
    if (type === 'subjects') {
      const sanitizedName = name.trim().toLowerCase();
      return `${basePath}/${sanitizedName}.png`;
    }
  
    const map = this.imageMap[type];
    if (!map.has(name)) {
      const count = this.RANDOM_IMAGE_COUNT[type];
      const randomIndex = Math.floor(Math.random() * count) + 1;
      map.set(name, randomIndex);
    }

    const assignedIndex = map.get(name)!;
    return `${basePath}/random-${assignedIndex}.png`;
  }
  
  handleImageError(event: Event, type: 'subjects' | 'categories' | 'concepts') {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = `/assets/images/covers/${type}/default.png`;
  }  

}
