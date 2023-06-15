import router from '../router'
export default ()=>{
    if(localStorage.getItem('logedIn')!=='true'){
        router.push('/login');
    }
}