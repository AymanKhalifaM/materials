import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrainingComponent } from '../training/training.component';
import { AuthGuard } from '../auth/auth.guard';



const routes:Routes=[
    { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }

]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
    providers:[AuthGuard]
})
export class TrainingRoutingModule{}