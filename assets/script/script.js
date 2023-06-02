//Contentful ARCHIVE DATA

const spaceId = "e6aae04j966s";
const environmentId = "master";
const accessToken = "L67tgUtJIAByIcmxzJjZgoBY7O6d8zGG5EQ0hwhyEG8";

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=fields.order&content_type=reuseItem`
console.log(url);

const sectionTag = document.querySelector("div.main-archive-container");

// Fetch Data
// fetching data for the archive page content

const getData = function () {
    return fetch(url)
    .then(response => response.json())
    .then(data => {

        //store the assets images for the archive page
        const assets = data.includes.Asset

        //contentful data
        return data.items.map( item => {

            let imageUrl = "./assets/img/bloem.svg";
            let originalUrl = "./assets/img/bloem.svg";
            
            const imageId = item.fields.reuseitObject.sys.id;
            
            const originalImageId = item.fields.original.sys.id;

            const imageData = assets.find(asset => {
                return asset.sys.id == imageId
            })

            const originalImageData = assets.find(asset => {
                return asset.sys.id == originalImageId
            })

            if(imageData){
                imageUrl = imageData.fields.file.url
            }

            if(originalImageData){
                originalUrl = originalImageData.fields.file.url
            }
        
            item.fields.reuseitObject = imageUrl
            item.fields.original = originalUrl
            return item.fields

        })
    })
}


// Run getData function on load

getData().then(data => {
    
    sectionTag.innerHTML = ""

    data.forEach(item => {
        sectionTag.innerHTML = sectionTag.innerHTML + `
        
                <div class="col-sm-4 col-lg-4 reuseitObject-container">
                    <img class="img-fluid img-thumbnail reuseitObject-image" src="${item.reuseitObject}">
                    <div class="text-center">
                        <p>${item.title}</p>
                        <a class="archive-link" href="${item.original}" target="_blank">link to the original object</a>
                        <a href="${item.reuseitObject}" download>
                            <img class="mt-4" src="./assets/img/downloadIcon.svg" alt="download icon">
                        </a>
                    </div>
                </div>
        
        `
    });

})


//To the top button function
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else if (document.body.scrollTop < 20 || document.documentElement.scrollTop < 20) {
        topButton.style.display = "none";
    }
}



function toTheTop (){
    topButton.addEventListener('click', function(){
        console.log('click')
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })
}

toTheTop();

//WORKSHOP DATA

