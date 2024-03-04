

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
    
    allPosts.map((singlePost) => {
        console.log(singlePost);

        title = singlePost.title;
        console.log(title);
        view = singlePost.view_count;
        
       
        const div = document.createElement('div');
        div.innerHTML = `
                
            <div class="indicator">
                <span class="indicator-item badge ${singlePost.isActive?'bg-green-600':'bg-red-600'}"></span> 
                <div class="grid w-32 h-32 bg-base-300 place-items-center"><img class="rounded-2xl" src="${singlePost.image}" alt=""></div>
            </div>
            <div class="space-y-5 w-full">
                <div class="flex gap-10 flex-col lg:flex-row">
                    <p class="text-xl text-[#12132D96] inter"># <span>${singlePost.category}</span></p>
                    <p class="text-xl text-[#12132D96] inter">Author: <span>${singlePost.author.name}</span> </p>
                </div> 
                    <h3 class="text-2xl text[#12132Dcc] font-extrabold mulish">${singlePost.title}</h3>
                    <p class="text-xl text-[#12132D80] border-b border-dashed border-[#12132D4D] pb-8">${singlePost.description}</p>

                <div class="flex justify-between flex-col lg:flex-row lg:gap-0 gap-4 pt-6 w-full">
                    <div class="flex gap-3 text-[#12132D96] font-semibold text-xl lg:space-x-8">
                        <p><i class="fa-regular fa-message mr-3"></i><span>${singlePost.comment_count}</span></p>
                        <p><i class="fa-regular fa-eye mr-3"></i> <span>${singlePost.view_count}</span></p>
                        <p><i class="fa-regular fa-clock mr-3"></i><span>${singlePost.posted_time
                        } min</span></p>
                    </div>
                    <div>
                        <button onclick="showTitle(title,view)" class="bg-[#10B981] px-3 py-2 text-white text-xl rounded-full"><i class="fa-solid fa-envelope-open"></i></button>
                    </div>
                </div>
            </div>
        `
        div.className = 'flex gap-16 flex-col lg:flex-row  bg-[#F3F3F5] p-8 rounded-2xl mb-8 row-span-1';
        postsContainer.appendChild(div);

                         


    }); 
 
      
    
}
// title show   


let showTitle = ((title,view) => {
    console.log(view);
    const titleContainer = document.getElementById('title-container');
    const div = document.createElement('div');
    div.innerHTML =`
        <h3 class="text-xl text[#12132D99] font-bold mulish">${title}</h3>
        <p class=" flex lg:justify-center items-center"><i class="fa-regular fa-eye mr-3"></i> <span>${view}</span></p>
    `
    div.classList = 'flex justify-between bg-white px-6 py-4 rounded-2xl mb-5 flex-col lg:flex-row lg:gap-0 gap-4';
    titleContainer.appendChild(div);
}); 

showTitle();
// document.getElementById('title-show').addEventListener('click',(e) => {
    
// });

// search function 

const searchPosts = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    const data = await res.json();
    console.log(data);
    // const searchText = document.getElementById('search-text').value;
    // document.getElementById('search-text').value = '';
    //allPostsFetch(searchText);
    
}
searchPosts();
allPostsFetch();