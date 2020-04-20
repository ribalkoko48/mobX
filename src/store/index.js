import {observable, action, computed} from 'mobx'

export const userStore = observable({
    age: 0,
    user: 'Vasili',

    setUser(user){
        this.user = user
    },

    setAge(age){
        this.age = this.age + age
    },

    get userFullData(){
        return `${this.user} ${this.age}`
    }
}, {
    setAge: action.bound,
    setUser: action.bound,
    userFullData: computed
}, {
    name: 'userStore'
});