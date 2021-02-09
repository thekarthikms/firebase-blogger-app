let removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}//remove child nodes function

const showPrevBlogs = (data,prevContent ) => {
    let post = document.createElement('div')
    post.setAttribute('class', 'post')
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let p2 = document.createElement('p')
    h2.innerHTML = `${data.blog}`
    p.innerHTML = `Blog by : ${data.name}`
    p2.innerHTML = `Time : ${data.time}`
    post.append(h2)
    post.append(p)
    post.append(p2)
    prevContent.append(post)
}//show previous blogs function

let showError = (err,loaderCircle,loader) => {
    loaderCircle.style.display = 'none'
    loader.style.display = 'flex'
    let h1 = document.createElement('h1')
    h1.setAttribute('style', 'font-size:3rem;color:black;')
    h1.innerHTML = err
    loader.append(h1)
    setTimeout(() => {
        loader.style.display = 'none'
        loader.removeChild(h1)
        loaderCircle.style.display = 'block'
        console.log('after2s')
    }, 2000);
}//show error function

let showLoader = (loader) => {
    loader.style.display = 'flex'
    setTimeout(() => {
        loader.style.display = 'none'
    }, 2000);
}//show loader function

export {
    removeAllChildNodes,
    showPrevBlogs,
    showError,
    showLoader
}