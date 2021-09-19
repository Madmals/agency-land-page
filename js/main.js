
//readmore function
const read_more_link = document.querySelector('.read')
const more = document.querySelector('.more')


read_more_link.addEventListener('click', () => {
	more.classList.toggle('active')

})

//burger show

const bur = document.querySelector('.header__bur')
const headernav = document.querySelector('.header__nav')
const body = document.querySelector('body')


bur.addEventListener('click', (e) => {
	e.stopImmediatePropagation();
	headernav.classList.toggle('show')
})

body.addEventListener('click', (e) => {
	if (e.currentTarget != headernav) {

		headernav.classList.add('show')
	}
})



//fix navbar logic

window.addEventListener('resize', (e) => {
	e.preventDefault()
	if (window.innerWidth < 790) {

		headernav.classList.add('show')
	} else if (window.innerWidth > 790) {
		console.log('a')
		location.reload()
	}
})


const all_showcaseimg = document.querySelectorAll('.showcase__gallery__item ')
const elements = document.getElementsByTagName('a')
const elemeh3 = document.getElementsByTagName('h3')
const elemesel = document.getElementsByTagName('select')
const button = document.querySelector('.btn')

for (let i = 0, len = elements.length; i < len; i++) {
	elements[i].addEventListener('click', (e) => {
		setTimeout(() => {
			headernav.classList.remove('show')
		}, 5)
	})
}

for (let i = 0, len = elemeh3.length; i < len; i++) {
	elemeh3[i].addEventListener('click', (e) => {
		setTimeout(() => {
			headernav.classList.remove('show')
		}, 5)
	})
}

for (let i = 0, len = elemesel.length; i < len; i++) {
	elemesel[i].addEventListener('click', (e) => {
		setTimeout(() => {
			headernav.classList.remove('show')
		}, 5)
	})
}

for (let i = 0; i < all_showcaseimg.length; i++) {
	all_showcaseimg[i].addEventListener('click', (e) => {
		setTimeout(() => {
			headernav.classList.remove('show')
		}, 5)
	})
}



//list of pics

const dropdown_timess = document.querySelector('.showcase__categories__sort-dropdown')
const text_des = document.querySelectorAll('.showcase__gallery__item h3')

//dropdown selection
dropdown_timess.addEventListener('click', () => {

	if (dropdown_timess.selectedIndex == 1) {

		collection_popular()

	}
	else {
		collection_newest()
	}
})


const collection_popular = async () => {

	let res = await fetch(`https://api.unsplash.com/users/steve_j/client_id=YOUR-API-KEY&per_page=18&order_by=popular`)
	let data = await res.json()

	for (let i = 0; i < all_showcaseimg.length; i++) {
		all_showcaseimg[i].style.backgroundImage = `url(${data[i].urls.regular})`
		text_des[i].textContent = `${data[i].alt_description}`
		if (text_des[i].textContent == `null`) {
			text_des[i].textContent = `Arts`
		}
	}
}


const collection_newest = async () => {

	let res = await fetch(`https://api.unsplash.com/users/steve_j/photos?clien_id=YOUR-API-KEY&per_page=18`)
	let data = await res.json()

	for (let i = 0; i < all_showcaseimg.length; i++) {
		all_showcaseimg[i].style.backgroundImage = `url(${data[i].urls.regular})`
		text_des[i].textContent = `${data[i].alt_description}`
	}
}


//selected tags

const textures = async () => {

	let res = await fetch(`https://api.unsplash.com/users/steve_j/photos?client_id=YOUR-API-KEY&per_page=50`)
	let data = await res.json()

	let ayam = data.filter(eachval => (eachval.topic_submissions["textures-patterns"]))

	for (let i = 0; i < all_showcaseimg.length; i++) {
		let [{ urls: { regular }, alt_description }] = ayam
		all_showcaseimg[i].style.backgroundImage = `url(${regular})`
		text_des[i].textContent = `${alt_description}`
		ayam.shift()
	}
}


const art = async () => {

	let res = await fetch(`https://api.unsplash.com/users/steve_j/photos?client_id=YOUR-API-KEY&per_page=50`)
	let data = await res.json()

	let ayam = data.filter(eachval => (eachval.topic_submissions["arts-culture"]))

	for (let i = 0; i < all_showcaseimg.length; i++) {

		let [{ urls: { regular }, alt_description }] = ayam
		all_showcaseimg[i].style.backgroundImage = `url(${regular})`
		text_des[i].textContent = `${alt_description}`
		ayam.shift()
	}
}


const art_button = document.querySelector('.art')

art_button.addEventListener('click', () => {
	art()
	clear_active()
	art_button.classList.add('active')
})


//click on texture burtton
const tex = document.querySelector('.textures')

tex.addEventListener('click', () => {

	textures()
	clear_active()
	tex.classList.add('active')


})

//click on all button

const all = document.querySelector('.all')

all.addEventListener('click', () => {
	collection_newest()
	clear_active()
	all.classList.add('active')
})


// clear active

const each_link = document.querySelectorAll('.showcase__categories__category__link')


const clear_active = () => {
	each_link.forEach(a => { a.classList.remove('active') })
}


//click on each pic to get img url first

let popup_conimg = document.querySelector('.showcase__gallery')


all_showcaseimg.forEach(eachayam => {
	eachayam.addEventListener('click', () => {
		let itik = eachayam.style.backgroundImage

		let pop_updiv = document.createElement('div')

		pop_updiv.classList.add('popup_img')

		pop_updiv.style.backgroundImage = `${itik}`

		popup_conimg.appendChild(pop_updiv)

		pop_updiv.addEventListener('click', () => {
			pop_updiv.classList.add('translate')
			setTimeout(() => {

				headernav.classList.remove('show')
			}, 5)
		})

	})
})

const show_more = document.querySelector('.showcase__gallery__more button')

show_more.addEventListener('click', async () => {
	let pop_showmore = document.createElement('div')
	pop_showmore.classList.add('popup_showmore')

	popup_conimg.appendChild(pop_showmore)



	const popup_showmore = document.querySelector('.popup_showmore')

	let res = await fetch(`https://api.unsplash.com/users/steve_j/photos?client_id=YOUR-API-KEY&per_page=18`)
	let data = await res.json()

	for (let i = 0; i < data.length; i++) {

		const imgg = document.createElement('img')
		imgg.src = `${data[i].urls.regular}`
		imgg.style.width = '100px'
		imgg.style.height = '100px'

		popup_showmore.appendChild(imgg)

		popup_showmore.addEventListener('click', () => {
			popup_showmore.classList.add('translate')
		setTimeout(() => {
			headernav.classList.remove('show')
		}, 5)
		})


		setTimeout(() => {
			headernav.classList.remove('show')
		}, 5)

	}



})


//news Area

const newsblock_imgparent = document.querySelector('.blog__cardarea')

const news_api = async () => {
	let res = await fetch('https://gnews.io/api/v4/search?q=painting&token=YOUR-API-KEY&lang=en&max=10')

	let data = await res.json()

	let { articles: eachdata } = data

	// console.log(eachdata)

	for (i = 0; i <= 2; i++) {

		let newsblock_img = document.createElement('div')
		newsblock_img.classList.add('blog__cardarea__card')

		let time = `${eachdata[i].publishedAt}`

		newsblock_img.innerHTML = `
					<div class="blog__cardarea__card__img"
						style="background-image: url('${eachdata[i].image}')">
						<a href="${eachdata[i].url}">READ MORE</a>
					</div>
					<h2>${eachdata[i].title}</h2>
					<p>${eachdata[i].description}</p>
					<h3>${time.split('T')[0]}</h3>

		`
		newsblock_imgparent.appendChild(newsblock_img)

	}

}



header = document.querySelector("header")

window.addEventListener('scroll', (e) => {

	if (window.scrollY > 0) {
		header.style.background = "#ffe600"
	} else {
		header.style.background = "white"
	}


})


news_api()
collection_newest()
