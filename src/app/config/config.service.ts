import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

//todo It is example, switch to auth and form types

// Injectable http service to provides operations

/**
 * Service is observable for all transactions
 */
@Injectable()
export class ConfigService {

  config: Config | undefined;

  // Back-end server url
  configUrl = 'assets/config.json';

  //Method to execute http get method
  getConfig() {
    // now returns an Observable of Config
    return this.http.get<Config>(this.configUrl, { observe: 'body', responseType: 'json' });
  }

  showConfig() {
    // Trigger observable object to notify observer
    this.getConfig()
      // Тригерим subscribe() методом Observable объект возвращенный из request
      // Это легче и безопаснее для обработки
      .subscribe((data: Config) => this.config = {
        heroesUrl: (data as any).heroesUrl,
        textFile: (data as any).textFile,
        date: data.date,
      });
  }

  // Injection of http client
  constructor(private http: HttpClient) {
  }

  /** POST: add a new hero to the database */
  /**
   * addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('addHero', hero))
      );
  }
   *
   */

  //body - The data to POST in the body of the request.
  // options - An object containing method options which, in this case, specify required headers.

  //The HeroesComponent initiates the actual POST operation by subscribing
  // to the Observable returned by this service method.

  // Мы через сервис прокидываем http post запрос и потом обрабатываем его через закидывание
  // добавленного героя в массив
  /**
   * this.heroesService.addHero(newHero).subscribe(hero => this.heroes.push(hero));
   */

  /** DELETE: delete the hero from the server */

  /**
   * deleteHero(id: number): Observable<unknown> {
  const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError('deleteHero'))
    );
}
   */

  /**
   * this.heroesService
   .deleteHero(hero.id)
   .subscribe();
   */
}

// Structure of object that HttpClient responded
export interface Config {
  heroesUrl: string;
  textFile: string;
  date: any;
}

//When you pass an interface as a type parameter to the HttpClient.get() method,
// use the RxJS map operator to transform the response data as needed by the UI.
// You can then pass the transformed data to the async pipe.
