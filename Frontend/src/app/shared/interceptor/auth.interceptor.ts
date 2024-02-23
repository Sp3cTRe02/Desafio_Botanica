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

//
// export const interceptoresInterceptor: HttpInterceptorFn = (req, next) => {
//   console.log(req.withCredentials)
//   let peticion = req.clone()
//   console.log(req.url)
//   const param = req.params.get('auth')
//   if(param){
//     //Como el parametro auth tiene valor aquí debemos meter vuestro token.
//     console.log(param)
//     peticion = req.clone({
//
//       headers : req.headers.set('x-token','token').set('d','dd'),
//
//     })
//   } else {
//     //en este paso como no tenemos el param auth pues no deberiamos meter el token en la cabecera
//     console.log(param)
//   }
//   return next(peticion) ;
// };
