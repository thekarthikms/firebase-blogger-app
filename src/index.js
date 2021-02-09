import "./css/main.scss";
import firebase from 'firebase/app';
import 'firebase/firestore'




const firebaseConfig = {
    apiKey: "AIzaSyAt9rnsVs8frEjKh2FZTKlIWBh_vt_mbu0",
    authDomain: "fir-blog-app-85c1f.firebaseapp.com",
    projectId: "fir-blog-app-85c1f",
    storageBucket: "fir-blog-app-85c1f.appspot.com",
    messagingSenderId: "445622570987",
    appId: "1:445622570987:web:319f3de458edd8cb7393ae"
};

firebase.initializeApp(firebaseConfig);


const form = document.querySelector('#add-blog')
const uploadF = document.querySelector('#uploadfield')
const prevBlogs = document.querySelector('#previous-blogs')
let prevContent = document.querySelector('#previous-content')
let clearPrev = document.querySelector('#clear-prev')
let loader = document.querySelector('.loader-container')
const db = firebase.firestore();

db.collection('blogs').get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        console.log(doc.data())
    })
})


uploadF.addEventListener('click', () => {
    let username = form.username.value;
    let blog = form.blog.value;
    if (username && blog) {
        if (username.length > 3 && blog.length > 6) {
            console.log(username)
            console.log(blog)
            db.collection('blog').add({
                name: username,
                blog: blog
            })
        }else{
            
        }
    }
    clearData()
})

prevBlogs.addEventListener('click',()=>{
    removeAllChildNodes(prevContent)
    let blogcontainer = document.querySelector('#blog-container')
    
    blogcontainer.style.display = 'flex'
    db.collection('blog').get().then((snapshot) => {
        snapshot.docs.forEach(doc =>{
            showPrevBlogs(doc)
        })
        
    })
 
})

const showPrevBlogs = (data)=>{
    let post = document.createElement('div')
        post.setAttribute('class','post')
        let h2 = document.createElement('h2')
        let p = document.createElement('p')
        h2.innerHTML = `${data.data().blog}`
        p.innerHTML = `Blog by : ${data.data().name}`
        console.log(data.name)
        post.append(h2)
        post.append(p)
        prevContent.append(post)
}

clearPrev.addEventListener('click',()=>{
    let bc = document.querySelector('#blog-container')
    bc.style.display = 'none'
})

let removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let clearData = ()=>{
    document.querySelector('#username').value = ''
    document.querySelector('#blog-data').value = ''
}