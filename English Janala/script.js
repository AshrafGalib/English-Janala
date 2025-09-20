//Nav Button Responsive
const getNavMenuButton =document.getElementById('MenuButton')
const getDropDownDiv =document.getElementById('DropDownButtons')
const getDropDownButtons =document.querySelectorAll('.ddbtn')
//console.log(getDropDownButtons)

getNavMenuButton.onclick=()=>{
    getDropDownDiv.classList.toggle('hidden')
}
getDropDownButtons.forEach(element => {
    element.onclick=()=>{
    getDropDownDiv.classList.toggle('hidden')
}
});

// Smooth Scroll
const getAllAnchorLink = document.querySelectorAll('a[href^="#"]')
//console.log(getAllAnchorLink)
getAllAnchorLink.forEach(link=>{
    link.addEventListener('click',function(event){
        event.preventDefault()
        const targetId =this.getAttribute("href")
           const targetElment = document.querySelector(targetId) 
           targetElment.scrollIntoView({behavior : "smooth"})
        
    })
})

// get Levels
const getLevels =async()=>{
 const res = await fetch('https://openapi.programming-hero.com/api/levels/all')
 const datas = await res.json()
 displayLevels(datas.data)
}

//display Levels
const displayLevels =async(data)=>{
const getLvlDiv =document.getElementById('levels')
data.forEach(singleData=>{
    //console.log(singleData.lessonName)
    const createButton = document.createElement('button')
    createButton.classList.add('btn','navBtnimg','btnClr','LessonBtn','selectInvrtImg')
    createButton.innerHTML =`<img src="assets/fa-book-open.png" alt="" class="navBtnimg">Lesson-${singleData.level_no}`
    getLvlDiv.append(createButton)
    const getLessonSection = document.getElementById('Lesson')
    getLessonSection.innerHTML=`
    <div class="grid text-center gap-4 py-12">
    <p>আপনি এখনো কোন Lesson Select করেন নি</p>
    <h1 class="font-bold text-3xl">একটি Lesson Select করুন।</h1>
    </div>
`
        createButton.onclick=()=>{
        rmvActiveBtn()
        createButton.classList.add('activeBtn')
        createButton.querySelector("img").classList.add('invertImg')
        getWordsByLesson(singleData.level_no)
    }
})
}

// get Words By Lessons
const getWordsByLesson =async(lvlNo)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/level/${lvlNo}`)
    const words = await res.json()
    
    viewWordsByLesson(words.data)
}

//view Words By Lessons
const viewWordsByLesson =async(wordsDetails)=>{
    console.log(wordsDetails)
   const getLessonSection = document.getElementById('Lesson')
   getLessonSection.innerHTML=""
    const createLoaderDiv=document.createElement('div')
    createLoaderDiv.classList.add("flex", "justify-center")
    createLoaderDiv.innerHTML=
    `
    <span class="loading loading-bars loading-xl"></span>
    `
    getLessonSection.append(createLoaderDiv)
if(wordsDetails.length===0){
            getLessonSection.classList.remove("grid","grid-cols-1","md:grid-cols-2","lg:grid-cols-3")
            getLessonSection.innerHTML=`
            <div class="grid justify-center text-center gap-4 py-12">
            <div class="flex justify-center"><img src="assets/alert-error.png" alt=""></div>
    <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h1 class="font-bold text-3xl">নেক্সট Lesson এ যান</h1>
    </div>
            `
            return
        }
    getLessonSection.classList.remove("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3")
    wordsDetails.forEach(wordDetails=>{
        getWordDetails(wordDetails.id)
    const createCardDiv = document.createElement('div')
    createCardDiv.classList.add("hidden","shadow-md", "card" ,"card-border","bg-base-100" ,"w-full" ,"forLoading") 
    createCardDiv.innerHTML =`
    <div class="text-center card-body">
    <h1 class="font-bold text-2xl">${wordDetails.word}</h1>
    <h2 class="font-bold text-md">Meaning/Pronounciation</h2>
    <h2 class="font-bold text-lg">"${wordDetails.meaning}/${wordDetails.pronunciation}"</h2>
    <div class="flex justify-between">
      <button onclick="getWordDetails(${wordDetails.id}),my_modal_5.showModal()" class="btn"><i class="fa-solid fa-circle-info"></i></button>
      <button onclick="pronounceWord('${wordDetails.word}')" class="btn"><i class="fa-solid fa-volume-high"></i></button>
    </div>
  </div>
    `
getLessonSection.append(createCardDiv)
  })
 //loader add
  setTimeout(()=>{
    getLessonSection.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3")
    createLoaderDiv.style.display="none"
    const getAllWordsDiv = document.getElementsByClassName("forLoading")
         for(wordDiv of getAllWordsDiv){
            wordDiv.classList.remove('hidden')
            //console.log(wordDiv)
        }  
},1000)
  }

// get word details
const getWordDetails =async(id)=>{
     const res = await fetch(`https://openapi.programming-hero.com/api/word/${id}`)
     const data = await res.json()
     viewWordDetails(data.data)
}

// View word details
const viewWordDetails =async(details)=>{
    const getModalDiv = document.getElementById('modalDiv')
    getModalDiv.innerHTML=`
    <h3 class="text-3xl font-bold">${details.word}(<i class="fa-solid fa-microphone"></i> : ${details.pronunciation})</h3><br><br>
    
    <h4 class="font-bold">Meaning</h4>
    <h4 class="text-lg">${details.meaning}</h4><br><br>
    
    <h4 class="font-bold">Example</h4>
    <h4 class="text-lg">${details.sentence}</h4><br><br>
    
    <h4 class="font-bold">সমার্থক শব্দগুলো</h4>
     <h4 class="text-lg">${details.synonyms}</h4>
    `
}
 

// Pronounce word
const pronounceWord = (word)=>{
    const utterance = new 
    SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
    
}

// Remove Active Button
const rmvActiveBtn =()=>{
//click krar por picture clr ager moto howar jnno
  const getAllInvrtedImg =document.getElementsByClassName('selectInvrtImg')  
  //console.log(getAllInvrtedImg)
  for(const getIvrtdImg of getAllInvrtedImg){
    getIvrtdImg.querySelector('img').classList.remove('invertImg')
}
  //remove active button
  const getAllLessonBtns = document.getElementsByClassName('LessonBtn')
 // console.log(getAllLessonBtns)
  for(const getLessonBtn of getAllLessonBtns){
    getLessonBtn.classList.remove('activeBtn')
    }
}


//For Desktop log in
const getDESKuserName = document.getElementById('DESKusername')
const getDESKpassword = document.getElementById('DESKpassword')
const getDESKStartedButton = document.getElementById('DESKgetStartedButton')
getDESKStartedButton.onclick=()=>{
 if(getDESKuserName.value && getDESKpassword.value === '123456'){
      const getAccessSecs = document.getElementsByClassName('accessSec')
      const getDESKbannerSEC =document.getElementById('DeskbannerSec')
      for(const getAccessSec of getAccessSecs){
        getAccessSec.classList.remove('hidden')
      }
getDESKbannerSEC.classList.remove('md:flex')
Swal.fire({
  title: "অভিনন্দন!",
  text: "চলুন আজ নতুন কিছু শেখা যাক।",
  icon: "success"
});
    }
    else{
         alert("Invalid Username or Password!");
    }
}

//for mobile log in

const getMBLuserName = document.getElementById('MBLusername')
const getMBLpassword = document.getElementById('MBLpassword')
const getMBLStartedButton = document.getElementById('MBLgetStartedButton')
getMBLStartedButton.onclick=()=>{
 if(getMBLuserName.value && getMBLpassword.value === '123456'){
      const getAccessSecs = document.getElementsByClassName('accessSec')
      const getMBLbannerSEC =document.getElementById('MblbannerSec')
      for(const getAccessSec of getAccessSecs){
        getAccessSec.classList.remove('hidden')
      }
getMBLbannerSEC.classList.add('hidden')
Swal.fire({
  title: "অভিনন্দন!",
  text: "চলুন আজ নতুন কিছু শেখা যাক।",
  icon: "success"
});
    }
    else{
         alert("Invalid Username or Password!");
    }
}

const logOut=()=>{
    const getAccessSecs = document.getElementsByClassName('accessSec')
      for(const getAccessSec of getAccessSecs){
        getAccessSec.classList.add('hidden')
    }
const getDESKbannerSEC =document.getElementById('DeskbannerSec')    
getDESKbannerSEC.classList.add('md:flex')

}


getLevels()
