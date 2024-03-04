

const postsContainer = document.getElementById('posts-container');
const activePost = document.getElementById('active-post');
let postArray = [];
let title = '';
let view = '';
let count = 0;

const allPostsFetch = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPosts = data.posts;
    console.log(allPosts);
    displayAllPosts(allPosts);
}

const displayAllPosts = (allPosts) => {
    postsContainer.innerHTML = '';
        
    allPosts.forEach((singlePost) => {
        //console.log(postArray);
        document.getElementById('loading-spinner').classList.add('hidden');
        
        title = singlePost.title;
        
        //console.log(title);
        view = singlePost.view_count;
        
       
        const div = document.createElement('div');
        div.innerHTML = `
                
            <div class="indicator">
                <span class="indicator-item badge ${singlePost.isActive?'bg-green-600':'bg-red-600'}"></span> 
                <div class="grid w-32 h-32 bg-base-300 place-items-center"><img class="rounded-2xl" src="${singlePost.image}" alt=""></div>
            </div>
            <div class="space-y-5 w-full">
                <div class="flex gap-10 flex-col lg:flex-row">
                    <p class="text-xl text-[#12132D96] inter"># <span>${singlePost?.category}</span></p>
                    <p class="text-xl text-[#12132D96] inter">Author: <span>${singlePost?.author.name}</span> </p>
                </div> 
                    <h3 class="text-2xl text[#12132Dcc] font-extrabold mulish">${singlePost?.title}</h3>
                    <p class="text-xl text-[#12132D80] border-b border-dashed border-[#12132D4D] pb-8">${singlePost?.description}</p>

                <div class="flex justify-between flex-col lg:flex-row lg:gap-0 gap-4 pt-6 w-full">
                    <div class="flex gap-3 text-[#12132D96] font-semibold text-xl lg:space-x-8">
                        <p><i class="fa-regular fa-message mr-3"></i><span>${singlePost?.comment_count}</span></p>
                        <p><i class="fa-regular fa-eye mr-3"></i> <span>${singlePost?.view_count}</span></p>
                        <p><i class="fa-regular fa-clock mr-3"></i><span>${singlePost?.posted_time
                        } min</span></p>
                    </div>
                    <div>
                        <button onclick="showTitle('${title.replace(/'/g,'@')}','${view}')" class="bg-[#10B981] px-3 py-2 text-white text-xl rounded-full"><i class="fa-solid fa-envelope-open"></i></button>
                    </div>
                </div>
            </div>
        `
        div.className = 'flex gap-16 flex-col lg:flex-row  bg-[#F3F3F5] p-8 rounded-2xl mb-8 row-span-1';
        postsContainer.appendChild(div);
        document.getElementById('search-box').value = "";

    }); 
 
}


// title show   
let showTitle = (title,view) => {
   //console.log(title,view,sum)
   const countPost = document.getElementById('count-post');
   const countText = countPost.innerText;
   const parseCountInt = parseInt(countText);
   const counter = parseCountInt + 1;
   countPost.innerText = counter;

    // ---------- add title and view -----------
    
    const titleContainer = document.getElementById('title-container');
    const div = document.createElement('div');
    div.innerHTML =`
        <h3 class="text-xl text[#12132D99] font-bold mulish">${title}</h3>
        <p class=" flex lg:justify-center items-center"><i class="fa-regular fa-eye mr-3"></i> <span>${view}</span></p>
    `
    div.classList = 'flex justify-between bg-white px-6 py-4 rounded-2xl mb-5 flex-col lg:flex-row lg:gap-0 gap-4';
    titleContainer.appendChild(div);
}; 


// search api function 
const searchPosts = async (categoryName) => {
    document.getElementById('loading-spinner').classList.remove('hidden');

    setTimeout(() => {
        displayAllPosts(allPosts); 
    }, 2000);
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data = await res.json();
    const allPosts = data.posts;
   
   console.log(data);
  
   
}
// handle search
const handleSearch = () => {
    console.log('click');
    const value = document.getElementById('search-box').value;
    
    console.log(value);
    if(value){
        searchPosts(value);
    }
    else{
        alert('please enter valid category name');
    }

}

// latest post
const latestPostContainer = document.getElementById('latest-post-container');
const showLatestPosts = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    //console.log('latest',data);

    data.forEach(item => {
        //console.log(item);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card   border border-[#12132D30]">
        <figure class="px-10 pt-10">
          <img src="${item.cover_image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body">
          <p class="flex items-center text-[#12132D99] text-xl"><i class="fa-regular fa-calendar mr-3"></i><span>${item.author.posted_date?item.author.posted_date:'No publish date'}</span></p>
          <h3 class="text-xl text[#12132D99] font-bold mulish">${item?.title}</h3>
          <p class="text-[#12132D99] inter">${item?.description}</p>

          <div class="flex lg:gap-6   gap-3">
            <div>
              <img class="rounded-full w-12 h-12" src="${item?.profile_image}" alt="">
            </div>
             
            <div>
                <p>${item?.author?.name}</p>
                <p>${item?.author?.designation?item?.author?.designation:'Unknown'}</p>
            </div>
          </div>
              
        </div>

      </div>
        `
        div.classList ='grid-cols-1 ';
        latestPostContainer.appendChild(div);

    });
}
showLatestPosts();
allPostsFetch();