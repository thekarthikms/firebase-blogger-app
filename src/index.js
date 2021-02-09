import "./css/main.scss";
import firebase from 'firebase/app';
import 'firebase/firestore'
import {
    removeAllChildNodes,
    showPrevBlogs,
    showError,
    showLoader
} from './js/utils'
import {
    firebaseConfig
} from './firebase.config'

firebase.initializeApp(firebaseConfig);


const form = document.querySelector('#add-blog')
const uploadForm = document.querySelector('#uploadfield')
const prevBlogs = document.querySelector('#previous-blogs')
let prevContent = document.querySelector('#previous-content'),
    clearPrev = document.querySelector('#clear-prev'),
    loader = document.querySelector('.loader-container'),
    loaderCircle = document.querySelector('.loader'),
    clearField = document.querySelector('#clearfield'),
    username = document.querySelector('#username'),
    blog = document.querySelector('#blog-data'),
    blogcontainer = document.querySelector('#blog-container'),
    oldUser = ''

const db = firebase.firestore();

db.collection('blogs').get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        console.log(doc.data())
    })
})

//form upload function
uploadForm.addEventListener('click', () => {
    let nameData = form.username.value;
    let blogData = form.blog.value;
    let timeData = new Date();
    if (nameData && blogData) {
        if (nameData.length > 3 && blogData.length > 6) {
            oldUser = nameData
            db.collection('blog').add({
                name: nameData,
                blog: blogData,
                time: timeData.toLocaleString()
            })
            showLoader(loader)
        } else {
            showError('Enter Minimum required values', loaderCircle, loader)
        }
    } else {
        showError('Enter Data to upload blog', loaderCircle, loader)
    }
    form.blog.value = ''
})

//show previous blog function
prevBlogs.addEventListener('click', () => {
    removeAllChildNodes(prevContent)
    if (oldUser) {
        blogcontainer.style.display = 'flex'
        db.collection('blog').where('name', '==', oldUser).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                showPrevBlogs(doc, prevContent)
            })

        })
    } else {
        showError("No data found...Enter your blog", loaderCircle, loader)
    }

})


//clear previous data function
clearPrev.addEventListener('click', () => {
    blogcontainer.style.display = 'none',
        username.value = ''
    blog.value = ''
})

//clear field button function
clearField.addEventListener('click', () => {
    username.value = ''
    blog.value = ''
})