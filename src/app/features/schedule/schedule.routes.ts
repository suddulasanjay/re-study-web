import { Routes } from "@angular/router";
import { CategoryListComponent } from "./category/category-list.component";
import { ConceptListComponent } from "./concept/concept-list.component";
import { SubjectListComponent } from "./subject/subject-list.component";
import { ScheduleLandingComponent } from "./schedule-landing/schedule-landing.component";
import { ManageSubjectComponent } from "./subject/manage-subject/manage-subject.component";
import { ManageCategoryComponent } from "./category/manage-category/manage-category.component";
import { ManageConceptComponent } from "./concept/manage-concept/manage-concept.component";

export const scheduleRoute = {
    subject: 'subject',
    category: 'category',
    concept : 'concept',
};

export const scheduleRoutes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: ScheduleLandingComponent,
    },
    {
      path: scheduleRoute.subject,
      component: SubjectListComponent,
    },
    {
      path: scheduleRoute.subject + '/:id',
      component: ManageSubjectComponent,
    },
    {
      path: scheduleRoute.category,
      component: CategoryListComponent,
    },
    {
      path: scheduleRoute.category + '/:id',
      component: ManageCategoryComponent,
    },
    {
      path: scheduleRoute.concept,
      component: ConceptListComponent,
    },
    {
      path: scheduleRoute.concept + '/:id',
      component: ManageConceptComponent,
    },
  ];