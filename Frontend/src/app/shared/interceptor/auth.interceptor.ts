import { HttpInterceptorFn, HttpRequest, HttpHandler } from '@angular/common/http';

//JaimeRafael
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let clonPeticion = req
  console.log(req);
  

  if(req.headers.get('auth') === 'true' && localStorage.getItem('token')){
   let headers = req.headers
   if(headers.has('auth')){
     headers = headers.delete('auth')
   }
   headers = headers.set('x-token', localStorage.getItem('token')!)
    clonPeticion = req.clone({headers})
    console.log(clonPeticion);    
  }

  return next(clonPeticion);
};
