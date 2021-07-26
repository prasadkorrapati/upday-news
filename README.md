# UpdayNews

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running unit tests along with code coverage

Run `ng test --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Further Details

To facilitate the login, logout functionality, saving user details in browser local storage.

## Key points in Application Design:

-   Core Module - to define reusable components and common functionality(maintaining user details in user context)
-   Boards Module - to render to the pages required for the given functionality
-   Auth Guard - Auth guard will valiadate user and if user is already logged in it will continue loading the page or will redirect to login page to get the user details
