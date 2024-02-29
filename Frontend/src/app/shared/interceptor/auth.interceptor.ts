import { HttpInterceptorFn, HttpRequest, HttpHandler } from '@angular/common/http';

//JaimeRafael
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let clonPeticion = req
  console.log(req);

  const param = req.params.get('auth')
  if(param){

    const token = sessionStorage.getItem('token')!
    clonPeticion = req.clone({
      headers : req.headers.set('x-token', token)
    })
  }

  return next(clonPeticion);
};

