import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import module
import { ElModule } from 'element-angular';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoComponent } from './todo/todo.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todo/:id', component: TodoComponent },
  {
    path: 'todos',
    component: TodosListComponent,
    data: { title: 'Todos List' }
  },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    TodosListComponent,
    TodoComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    ElModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
