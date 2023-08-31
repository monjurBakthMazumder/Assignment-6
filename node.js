const notFount = document.getElementById('notFount');
const loading = document.getElementById('loading');
      notFount.classList.add('hidden');
      const categoriesContainer = document.getElementById('categoriesContainer');
      const loadCategory = async() => {
        const categoryContainer = document.getElementById('categoryContainer');
        const res =  await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
        const data = await res.json();
        const categories = data.data;
        categories.forEach(category => {
          const button = document.createElement('button');
          button.innerHTML = `
          <a onclick="loadCategories('${category.category_id}')" class="btn bg-gray-200 hover:bg-white hover:text-red-600 hover:border-red-600">${category.category}</a>
          `
          categoryContainer.appendChild(button);
        });
      }
      loadCategory();
      const loadCategories = async(id) => {
        loading.classList.remove('hidden');
        categoriesContainer.innerHTML = '';
        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        console.log(id);
        const data = await res.json();
        const allData = data.data;
        if(allData.length <= 0){
          notFount.classList.remove('hidden');
          loading.classList.add('hidden');
        }
        else{
          notFount.classList.add('hidden');
        }
        let dateCount = 0;
        allData.forEach(data => {
          const card = document.createElement('div');
          console.log();
          card.classList = `card card-compact`;
          dateCount++;
          card.innerHTML = `
          <figure class="h-48 relative" id="${dateCount}"><img src="${data.thumbnail}" alt="Shoes" class="rounded-lg h-full w-full"/>
          </figure>
          <div class="py-5">
            <div class="flex justify-starts items-start gap-3">
              <div class="">
                <img src="${data.authors[0].profile_picture}" alt="" class="h-10 w-10 rounded-full">
              </div>
              <div class="flex-1">
                <h1 class="text-lg font-semibold">${data.title}</h1>
                <h2 class="text-base flex justify-start items-center gap-2 text-gray-600">${data.authors[0].profile_name} ${data.authors[0].verified === true ? '<i class="fa-solid fa-circle-check text-blue-700 text-base"></i>' : ''} </h2>
                <h2 class="text-base text-gray-600">${data.others.views} views</h2>
              </div>
            </div>
          </div>
          `;
          categoriesContainer.appendChild(card);
          const time = data.others.posted_date;
          if(time !== ''){
            const chill = document.getElementById(`${dateCount}`)
            const div = document.createElement('div');
            div.classList = `absolute bottom-3 right-3 bg-black bg-opacity-80 rounded p-1 text-white text-xs`;
            const hrsFloor = time / 3600;
            const hrs = Math.floor(hrsFloor);
            const minTotal = time % 3600;
            const minFloor = minTotal / 60;
            const min = Math.floor(minFloor);
            div.innerHTML = `${hrs}hrs ${min}min ago`;
            chill.appendChild(div);
            loading.classList.add('hidden');
          }
        });
      }
      loadCategories('1000')
      const sortByViews = async () => {
      loading.classList.remove('hidden');
      categoriesContainer.innerHTML = '';
      notFount.classList.add('hidden');
      const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
      const data = await res.json();
      const allData = data.data;
      const array = [...allData];
      array.sort((firstObject, secondObject) => secondObject.others.views.slice(0, -1) - firstObject.others.views.slice(0, -1));
      let dateCount = 0;
      array.forEach(data => {
          const card = document.createElement('div');
          console.log();
          card.classList = `card card-compact`;
          dateCount++;
          card.innerHTML = `
          <figure class="h-48 relative" id="${dateCount}"><img src="${data.thumbnail}" alt="Shoes" class="rounded-lg h-full w-full"/>
          </figure>
          <div class="py-5">
            <div class="flex justify-starts items-start gap-3">
              <div class="">
                <img src="${data.authors[0].profile_picture}" alt="" class="h-10 w-10 rounded-full">
              </div>
              <div class="flex-1">
                <h1 class="text-lg font-semibold">${data.title}</h1>
                <h2 class="text-base flex justify-start items-center gap-2 text-gray-600">${data.authors[0].profile_name} ${data.authors[0].verified === true ? '<i class="fa-solid fa-circle-check text-blue-700 text-base"></i>' : ''} </h2>
                <h2 class="text-base text-gray-600">${data.others.views} views</h2>
              </div>
            </div>
          </div>
          `;
          categoriesContainer.appendChild(card);
          const time = data.others.posted_date;
          if(time !== ''){
            const chill = document.getElementById(`${dateCount}`)
            const div = document.createElement('div');
            div.classList = `absolute bottom-3 right-3 bg-black bg-opacity-80 rounded p-1 text-white text-xs`;
            const hrsFloor = time / 3600;
            const hrs = Math.floor(hrsFloor);
            const minTotal = time % 3600;
            const minFloor = minTotal / 60;
            const min = Math.floor(minFloor);
            div.innerHTML = `${hrs}hrs ${min}min ago`;
            chill.appendChild(div);
            loading.classList.add('hidden');
          }
        });
    }