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
const db = firebase.firestore();

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


db.collection('blogs').get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        console.log(doc.data())
    })
})

//form upload function
uploadForm.addEventListener('click', () => {
    uploadFormBlogData()
})

//show previous blog function
prevBlogs.addEventListener('click', () => {
    removeAllChildNodes(prevContent)
    if(username.value){
       showUserBlogs(username.value)
    }

    else if (oldUser) {
        showUserBlogs(oldUser)
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

form.addEventListener('submit', (e) => {
    e.preventDefault();
    uploadFormBlogData()
})//form submission listner

let uploadFormBlogData = () => {
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
}//upload blog listner

let showUserBlogs = (data)=>{
    blogcontainer.style.display = 'flex'
    let postArray = []
    db.collection('blog').where('name', '==', data).get().then((snapshot) => {
        snapshot.forEach(doc => {
            arrayMake(doc,postArray)
        })
            postArray.sort((a, b) => {
                let fa = a.time,
                    fb = b.time
                if (fa > fb) {
                    return -1
                } else if (fa < fb) {
                    return 1
                } else {
                    return 0
                }
            })
        postArray.forEach((data)=>{
            showPrevBlogs(data, prevContent)
        })
    }).then(() => {
        const offset = blogcontainer.offsetTop
        scrollTo({
            top: offset,
            behavior: "smooth"
        })
    })
}

let arrayMake = (data,postArray)=>{
    let blogname = data.data().name
    let blogpost = data.data().blog
    let blogtime = data.data().time

    let BlogData = {
        "name":blogname,
        "blog":blogpost,
        "time":blogtime
    }
    postArray.push(BlogData)
}