import { types } from 'mobx-state-tree';
import InfoUser from '../type/UserType';


const AuthStore = types
  .model({
    user: types.optional(InfoUser, {
      id: 0,
      name: '',
      email: '',
      role_name: '',
      role_slug: '',
    }),
    isLogin: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    setUser(user: typeof InfoUser.Type) {
      self.user = user;
    },
    setIsLogin(isLogin: boolean) {
      self.isLogin = isLogin;
    }
  }));


const authStore = AuthStore.create();
export default authStore;