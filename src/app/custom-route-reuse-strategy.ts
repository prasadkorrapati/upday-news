import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
    private storedRoutes = new Map<string, DetachedRouteHandle>();

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log('ROUTING STRATEGY ==>>>>>>> should detach  ');
      return route.routeConfig.path && route.routeConfig.path === 'list';
    }
  
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        console.log('ROUTING STRATEGY ==>>>>>>> store   ');
      this.storedRoutes.set(route.routeConfig.path, handle);
    }
  
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log('ROUTING STRATEGY ==>>>>>>> should attach ')
      return route.routeConfig.path && !!route.routeConfig && !!this.storedRoutes.get(route.routeConfig.path);
    }
  
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        console.log('ROUTING STRATEGY ==>>>>>>> retrieve  ')
      return route.routeConfig && route.routeConfig.path && this.storedRoutes.get(route.routeConfig.path);
    }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
      console.log('ROUTING STRATEGY ==>>>>>>> reuse  ');
    return false;
  }
}