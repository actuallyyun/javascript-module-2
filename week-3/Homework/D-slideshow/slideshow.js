// Write your code here
const images = []
const previousBtn = document.getElementById("previousBtn")
const nextBtn = document.querySelector('#nextBtn')
const autoPreviousBtn = document.querySelector('#autoPreviousBtn')
const autoNextBtn = document.querySelector("#autoNextBtn")

//fetch image data and create a images array
let counter = 0
const apiCallInterval = setInterval(() => {
    counter = counter + 1
    fetch("https://source.unsplash.com/random")
        .then(r => {
            const imageUrl = r.url
            images.push(imageUrl)
        })
    stopApiCall(counter)
}, 1000)

const stopApiCall = (counter) => {
    if (counter >= 10) {
        clearInterval(apiCallInterval)
    }
}



let image = document.querySelector('#carousel-image')

const findIndex = () => {
    let currentIndex = images.findIndex((url) => url === image.src)
    return currentIndex

}


const showImage = (index) => {
    image.src = images[index]
}
const setPreviousIndex = (index) => {
    if (index < 10 && index > 0) {
        index = index - 1

    } else if (index === 0) {
        index = 9
    } else {
        index = 0
    }

    return index
}

const setNextIndex = (index) => {
    if (index === 9) {
        index = 0
    } else {
        index = index + 1
    }
    return index
}

previousBtn.addEventListener('click', (e) => {

    let newIndex = setPreviousIndex(findIndex())
    showImage(newIndex)
})


nextBtn.addEventListener('click', (e) => {
    let newIndex = setNextIndex(findIndex())
    showImage(newIndex)
})



const autoPrevious = () => {
    setInterval(() => {

        let newIndex = setPreviousIndex(findIndex())
        showImage(newIndex)
    }, 1000)
}

const autoNext = () => {
    setInterval(() => {
        let newIndex = setNextIndex(findIndex())
        showImage(newIndex)
    }, 10000)
}


autoPreviousBtn.addEventListener('click', () => {
    autoPrevious()
})


autoNextBtn.addEventListener('click', () => {
    autoNext()
})

