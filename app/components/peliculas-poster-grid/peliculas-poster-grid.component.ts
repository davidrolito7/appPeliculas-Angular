import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/peliculas.interface';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[] = [];
  paginaActual: number = 1;
  peliculasPorPagina: number = 15; // Valor predeterminado: 10 pósters por página
  totalPaginas: number = 0;
  paginas: number[] = [];

  constructor(config: NgbRatingConfig, private router: Router) {
    // customize default values of ratings used by this component tree
    config.max = 10;
    config.readonly = true;
  }

  ngOnInit() {
    console.log(this.movies);
    this.calcularPaginas();
  }

  onMovieClick(movie: Movie) {
    this.router.navigate(['/pelicula', movie.id]);
  }

  getPeliculasPaginadas(): Movie[] {
    const startIndex = (this.paginaActual - 1) * this.peliculasPorPagina;
    const endIndex = startIndex + this.peliculasPorPagina;
    return this.movies.slice(startIndex, endIndex);
  }

  cambiarPagina(pagina: number) {
    if (pagina > 0 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.calcularPaginas();
    }
  }

  anteriorPagina() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.calcularPaginas();
    }
  }

  siguientePagina() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.calcularPaginas();
    }
  }

  calcularPaginas() {
    this.totalPaginas = Math.ceil(this.movies.length / this.peliculasPorPagina);
    this.paginas = [];

    const paginasVisibles = 10; // Cantidad de páginas numeradas que quieres mostrar
    const rangoMitad = Math.floor(paginasVisibles / 2);

    let rangoInicio = Math.max(this.paginaActual - rangoMitad, 1);
    let rangoFin = Math.min(rangoInicio + paginasVisibles - 1, this.totalPaginas);

    if (rangoFin - rangoInicio + 1 < paginasVisibles) {
      rangoInicio = Math.max(rangoFin - paginasVisibles + 1, 1);
    }

    for (let i = rangoInicio; i <= rangoFin; i++) {
      this.paginas.push(i);
    }
  }
}
