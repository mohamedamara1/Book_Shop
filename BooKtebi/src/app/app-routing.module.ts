import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { GeneralsettingsComponent } from './pages/generalsettings/generalsettings.component';
import { HomeComponent } from "./pages/home/home.component";
import { SignupComponent } from "./pages/signup/signup.component";

const routes: Routes = [
 // {path:'', component:GeneralsettingsComponent},
  
{
    path: "",
    component: HomeComponent,
  },
{
    path: "signup",
    component: SignupComponent,
  },
    {path:'generalsettings',
   component:GeneralsettingsComponent,
  children: [
    {path:'profile-settings', component:ProfileSettingsComponent},
    {path:'payment-method', component:PaymentInfoComponent},
    {path:'delete-account', component:DeleteAccountComponent}
        ]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
