import Cookies from 'js-cookie';

const SetCookie = (name: string, value: string) => {
  Cookies.set(name, value, {
    expires: 30,
    path: '/',
  });
};

const GetCookie = (name: string) => {
  return Cookies.get(name);
};

const RemoveCookie = (name: string) => {
  Cookies.remove(name);
};

const Cookie = {
  SetCookie,
  GetCookie,
  RemoveCookie
}

export default Cookie;