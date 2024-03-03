
const searchText = document.getElementById('search-text');
const postsContainer = document.getElementById('posts-container');
const activePost = document.getElementById('active-post');
const isActive = false;

const allPostsFetch = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPosts = data.posts;

    allPosts.forEach((singlePost) => {
        console.log(singlePost);

        

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="indicator">
                <span id="active-post" class="indicator-item badge bg-red-600"></span> 
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
                        <button class="bg-[#10B981] px-3 py-2 text-white text-xl rounded-full"><i class="fa-solid fa-envelope-open"></i></button>
                    </div>
                </div>
            </div>
        `
        div.className = 'flex gap-16 flex-col lg:flex-row  bg-[#F3F3F5] p-8 rounded-2xl mb-8 row-span-1';
        postsContainer.appendChild(div);

    });
}
allPostsFetch();