import { NgModule } from "@angular/core";
/*
 * Importaciónes de Angular Material */
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'

@NgModule({
// Aquí se exportan todos los modulos de Angular Material a toda la aplicación
    exports: [
        MatToolbarModule, 
        MatCardModule, 
        MatButtonModule, 
        MatIconModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,     
    ] 
})

/*
 * * Se agrega la clase al archivo app.module.ts */
export class MaterialModule {

}