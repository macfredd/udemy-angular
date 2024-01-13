import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Heroe, Publisher } from '../../interfaces/heros.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../shared/components/dialogs/confirm/confirm.component';
import { ConfirmData } from '../../../shared/components/dialogs/interfaces/confirm.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit {

  public viewTitle: string = 'New Hero';

  public  heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', {nonNullable: true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters:       new FormControl<string>(''),
    alt_img:          new FormControl<string>('')
  });

  public publishers = [
    {id:'DC Comics', desc: 'DC Comics'}, 
    {id:'Marvel Comics', desc: 'Marvel Comics'}];

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }
  
  
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.heroService.getHeroeById( id )),  
    ).subscribe(heroe => {
      if (!heroe) return this.router.navigateByUrl('/heroes/list'); 

      this.viewTitle = `Edit Hero: ${heroe.superhero}`;
      this.heroForm.reset(heroe);

      return;
    });
  }

  onSubmit() {
    if (this.currentHero.id) {
      this.heroService.updateHeroe(this.currentHero)
      .subscribe(resp => {
        this.showSnackbar('Record updated successfully');
        this.router.navigateByUrl('/heros/list');
      });

      return;
    }

    this.heroService.addHeroe(this.currentHero)
    .subscribe( resp => {
      this.showSnackbar('Record created successfully');
      this.router.navigateByUrl('/heros/list');
    })
  }

  get currentHero(): Heroe {
    return this.heroForm.value as Heroe;
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'ok!', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onDeleteHero() {
    const confirmData: ConfirmData  = {
      title: 'Delete Hero',
      message: `Are you sure you want to delete the hero ${this.currentHero.superhero}?`
    };
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: confirmData,
    });

    dialog.afterClosed()
    .pipe(
      switchMap(resp => {
        if (resp) 
          return this.heroService.deleteHeroe(this.currentHero.id!);
        return of(false);
      })
    ).subscribe(resp => {
      if (!resp) {
        return;
      }

      this.showSnackbar('Record deleted successfully');
      this.router.navigateByUrl('/heros/list');
    });

    dialog.afterClosed()
    .subscribe(resp => {
      if (resp) {
        console.log(resp);

        this.heroService.deleteHeroe(this.currentHero.id!)
        .subscribe(resp => {
          this.showSnackbar('Record deleted successfully');
          this.router.navigateByUrl('/heros/list');
        });
      }
    });
  }
}
