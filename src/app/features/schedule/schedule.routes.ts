import { Routes } from "@angular/router";
import { appRoute } from "../../app-route.constants";
import { ScheduleComponent } from "./schedule.component";
import { CategoryComponent } from "./category/category.component";
import { ConceptComponent } from "./concept/concept.component";
import { SubjectComponent } from "./subject/subject.component";
import { ScheduleLandingComponent } from "./schedule-landing/schedule-landing.component";

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
      component: SubjectComponent,
    },
    {
      path: scheduleRoute.subject + '/:id',
      component: SubjectComponent,
    },
    {
      path: scheduleRoute.category,
      component: CategoryComponent,
    },
    {
      path: scheduleRoute.category + '/:id',
      component: CategoryComponent,
    },
    {
      path: scheduleRoute.concept,
      component: ConceptComponent,
    },
    {
      path: scheduleRoute.concept + '/:id',
      component: ConceptComponent,
    },
  ];