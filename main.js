gsap.registerPlugin(ScrollTrigger);
Splitting();
 new WOW().init(); 




//section4 가로배열

let horSection=gsap.utils.toArray('.port_desc .port');
let horiz=gsap.to(horSection,{
   
    xPercent:- 97 * (horSection.length - 1),
    scrollTrigger:{
        trigger:'#section2',
        start:'top 0',
        end:"+=2500",  
        scrub:1,  
        pin:true,
        onUpdate:updateSliderOne}
        
    }
)

function updateSliderOne(progress){
  //console.log(progress.progress)
  if(progress.progress>0.28){
    gsap.to('.back_img_03',{rotate: progress.progress * 155,
    })
  }

}






  /* cube animation */
  var events = new Events();
events.add = function(obj) {
  obj.events = { };
}
events.implement = function(fn) {
  fn.prototype = Object.create(Events.prototype);
}

function Events() {
  this.events = { };
}
Events.prototype.on = function(name, fn) {
  var events = this.events[name];
  if (events == undefined) {
    this.events[name] = [ fn ];
    this.emit('event:on', fn);
  } else {
    if (events.indexOf(fn) == -1) {
      events.push(fn);
      this.emit('event:on', fn);
    }
  }
  return this;
}
Events.prototype.once = function(name, fn) {
  var events = this.events[name];
  fn.once = true;
  if (!events) {
    this.events[name] = [ fn ];
    this.emit('event:once', fn);
  } else {
    if (events.indexOf(fn) == -1) {
      events.push(fn);
      this.emit('event:once', fn);
    }
  }
  return this;
}
Events.prototype.emit = function(name, args) {
  var events = this.events[name];
  if (events) {
    var i = events.length;
    while(i--) {
      if (events[i]) {
        events[i].call(this, args);
        if (events[i].once) {
          delete events[i];
        }
      }
    }
  }
  return this;
}
Events.prototype.unbind = function(name, fn) {
  if (name) {
    var events = this.events[name];
    if (events) {
      if (fn) {
        var i = events.indexOf(fn);
        if (i != -1) {
          delete events[i];
        }
      } else {
        delete this.events[name];
      }
    }
  } else {
    delete this.events;
    this.events = { };
  }
  return this;
}

var userPrefix;

var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  userPrefix = {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();

function bindEvent(element, type, handler) {
  if(element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    element.attachEvent('on' + type, handler);
  }
}

function Viewport(data) {
  events.add(this);

  var self = this;

  this.element = data.element;
  this.fps = data.fps;
  this.sensivity = data.sensivity;
  this.sensivityFade = data.sensivityFade;
  this.touchSensivity = data.touchSensivity;
  this.speed = data.speed;

  this.lastX = 0;
  this.lastY = 0;
  this.mouseX = 0;
  this.mouseY = 0;
  this.distanceX = 0;
  this.distanceY = 0;
  this.positionX = 1122;
  this.positionY = 136;
  this.torqueX = 0;
  this.torqueY = 0;

  this.down = false;
  this.upsideDown = false;

  this.previousPositionX = 0;
  this.previousPositionY = 0;

  this.currentSide = 0;
  this.calculatedSide = 0;


  bindEvent(document, 'mousedown', function() {
    self.down = true;
  });

  bindEvent(document, 'mouseup', function() {
    self.down = false;
  });
  
  bindEvent(document, 'keyup', function() {
    self.down = false;
  });

  bindEvent(document, 'mousemove', function(e) {
    self.mouseX = e.pageX;
    self.mouseY = e.pageY;
  });

  bindEvent(document, 'touchstart', function(e) {

    self.down = true;
    e.touches ? e = e.touches[0] : null;
    self.mouseX = e.pageX / self.touchSensivity;
    self.mouseY = e.pageY / self.touchSensivity;
    self.lastX  = self.mouseX;
    self.lastY  = self.mouseY;
  });

  bindEvent(document, 'touchmove', function(e) {
    if(e.preventDefault) { 
      e.preventDefault();
    }

    if(e.touches.length == 1) {

      e.touches ? e = e.touches[0] : null;

      self.mouseX = e.pageX / self.touchSensivity;
      self.mouseY = e.pageY / self.touchSensivity;

    }
  });

  bindEvent(document, 'touchend', function(e) {
    self.down = false;
  });  

  setInterval(this.animate.bind(this), this.fps);

}
events.implement(Viewport);
Viewport.prototype.animate = function() {

  this.distanceX = (this.mouseX - this.lastX);
  this.distanceY = (this.mouseY - this.lastY);

  this.lastX = this.mouseX;
  this.lastY = this.mouseY;

  if(this.down) {
    this.torqueX = this.torqueX * this.sensivityFade + (this.distanceX * this.speed - this.torqueX) * this.sensivity;
    this.torqueY = this.torqueY * this.sensivityFade + (this.distanceY * this.speed - this.torqueY) * this.sensivity;
  }

  if(Math.abs(this.torqueX) > 1.0 || Math.abs(this.torqueY) > 1.0) {
    if(!this.down) {
      this.torqueX *= this.sensivityFade;
      this.torqueY *= this.sensivityFade;
    }

    this.positionY -= this.torqueY;

    if(this.positionY > 360) {
      this.positionY -= 360;
    } else if(this.positionY < 0) {
      this.positionY += 360;
    }

    if(this.positionY > 90 && this.positionY < 270) {
      this.positionX -= this.torqueX;

      if(!this.upsideDown) {
        this.upsideDown = true;
        this.emit('upsideDown', { upsideDown: this.upsideDown });
      }

    } else {

      this.positionX += this.torqueX;

      if(this.upsideDown) {
        this.upsideDown = false;
        this.emit('upsideDown', { upsideDown: this.upsideDown });
      }
    }

    if(this.positionX > 360) {
      this.positionX -= 360;
    } else if(this.positionX < 0) {
      this.positionX += 360;
    }

    if(!(this.positionY >= 46 && this.positionY <= 130) && !(this.positionY >= 220 && this.positionY <= 308)) {
      if(this.upsideDown) {
        if(this.positionX >= 42 && this.positionX <= 130) {
          this.calculatedSide = 3;
        } else if(this.positionX >= 131 && this.positionX <= 223) {
          this.calculatedSide = 2;
        } else if(this.positionX >= 224 && this.positionX <= 314) {
          this.calculatedSide = 5;
        } else {
          this.calculatedSide = 4;
        }
      } else {
        if(this.positionX >= 42 && this.positionX <= 130) {
          this.calculatedSide = 5;
        } else if(this.positionX >= 131 && this.positionX <= 223) {
          this.calculatedSide = 4;
        } else if(this.positionX >= 224 && this.positionX <= 314) {
          this.calculatedSide = 3;
        } else {
          this.calculatedSide = 2;
        }
      }
    } else {
      if(this.positionY >= 46 && this.positionY <= 130) {
        this.calculatedSide = 6;
      }

      if(this.positionY >= 220 && this.positionY <= 308) {
        this.calculatedSide = 1;
      }
    }

    if(this.calculatedSide !== this.currentSide) {
      this.currentSide = this.calculatedSide;
      this.emit('sideChange');
    }

  }

  this.element.style[userPrefix.js + 'Transform'] = 'rotateX(' + this.positionY + 'deg) rotateY(' + this.positionX + 'deg)';

  if(this.positionY != this.previousPositionY || this.positionX != this.previousPositionX) {
    this.previousPositionY = this.positionY;
    this.previousPositionX = this.positionX;

    this.emit('rotate');

  }

}
var viewport = new Viewport({
  element: document.getElementsByClassName('cube')[0],
  fps: 20,
  sensivity: .1,
  sensivityFade: .93,
  speed: 2,
  touchSensivity: 1.5
});

function Cube(data) {
  var self = this;

  this.element = data.element;
  this.sides = this.element.getElementsByClassName('side');

  this.viewport = data.viewport;
  this.viewport.on('rotate', function() {
    self.rotateSides();
  });
  this.viewport.on('upsideDown', function(obj) {
    self.upsideDown(obj);
  });
  this.viewport.on('sideChange', function() {
    self.sideChange();
  });
}
Cube.prototype.rotateSides = function() {
  var viewport = this.viewport;
  if(viewport.positionY > 90 && viewport.positionY < 270) {
    this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX + viewport.torqueX) + 'deg)';
    this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 + viewport.torqueX) + 'deg)';
  } else {
    this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX - viewport.torqueX) + 'deg)';
    this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 - viewport.torqueX) + 'deg)';
  }
}
Cube.prototype.upsideDown = function(obj) {

  var deg = (obj.upsideDown == true) ? '180deg' : '0deg';
  var i = 5;

  while(i > 0 && --i) {
    this.sides[i].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + deg + ')';
  }

}
Cube.prototype.sideChange = function() {

  for(var i = 0; i < this.sides.length; ++i) {
    this.sides[i].getElementsByClassName('cube-image')[0].className = 'cube-image';    
  }

  this.sides[this.viewport.currentSide - 1].getElementsByClassName('cube-image')[0].className = 'cube-image active';

}

new Cube({
  viewport: viewport,
  element: document.getElementsByClassName('cube')[0]
});






/* rotating TEXT */

document.querySelectorAll(".rotatingHeader").forEach((header,index)=>{

  gsap.registerPlugin(ScrollTrigger);
  let tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: "top 70%",
        scrub:1,
      },
    });

function initHeaders(header) {
let original = header.querySelector(".rotating");
let clone = original.cloneNode(true);
header.appendChild(clone);
gsap.set(clone, { yPercent: -100 });


let originalSplit=Splitting({target:original})
let cloneSplit=Splitting({target:clone})


gsap.set(cloneSplit[0].chars, {
  rotationX: -90,
  opacity: 0,
  transformOrigin: "50% 50% -50",
});

let stagger= {each:0.05,delay:index * 10}

tl.to(originalSplit[0].chars, { duration: 0.4, rotationX: 90, stagger:stagger,transformOrigin: "50% 50% -50" });
tl.to(originalSplit[0].chars, { duration: 0.4, opacity: 0, stagger:stagger }, 0);

tl.to(cloneSplit[0].chars, { duration: 0.05, stagger:stagger, opacity: 1 }, 0.001);
tl.to(cloneSplit[0].chars, { duration: 0.4, rotationX: 0, stagger: stagger }, 0);
}

initHeaders(header);

})
 




/* particles 애니메이션  */
const particlesJSON = {
  "particles": {
    "number": {
      "value": 40,//75
      "density": {
        "enable": true,
        "value_area": 700//500
      }
    },
    "color": {
      "value": "#cecece"//동그라미
    },
    "opacity": {
      "value": 10,//1
      "anim": {
        "enable": true,
        "speed": 10,
        "opacity_min": .5,
        "sync": false
      }
    },
    "shape": {
      "type": "circle"
    },
    "size": {
      "value":4,
      "random": true
    },
    "line_linked": {
      "enable": true,
  "distance": 165,
  "color": "#feffd0",//선색
  "opacity": 0.7,
  "width": 2.5 //4
    },
    "move": {
      "enable": true,
      "speed": 5, //14
      "direction": "none",
      "straight": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false
      },
      "onclick": {
        "enable": false
      }
    }
  }
}


particlesJS("particles-js", particlesJSON)


document.getElementById("particles-js").onload = function() {myFunction()};

function myFunction() {
  document.getElementById("demo").innerHTML = "Iframe is loaded.";
}

var showLoading;

function showParticles() {
  showLoading = setTimeout(showPage, 2000);
 document.getElementById("particles-js").classList.add('background-particle');
 document.body.setAttribute("class", "noscroll");
 document.getElementById("overlay").style.display = "block";
  document.getElementById("spinner").style.display = "block";
}

function showPage() {
  document.getElementById("overlay").style.display = "none";
document.getElementById("spinner").style.display = "none";
 document.body.removeAttribute("class", "noscroll"); document.body.className.replace(/\bnoscroll\b/,'');
  document.getElementById("particles-js").classList.add("particleOnLoad");
  document.getElementById("particles-js").classList.remove("background-particle"); document.getElementById("bodyParticle").style.display = "block";
  document.getElementById("spinner").classList.remove("loader");
}












//iphone
const iphone = document.querySelector(".iphone");
const widgets = document.querySelectorAll(".widgets");
/* const word = document.querySelector(".word");  */

gsap.set(iphone, { x: -450, rotation: 90 });
gsap.set(widgets, { opacity: 0, scale: 0 });
/* gsap.set(word, { opacity: 0, scale: 0 });  */

function iPhoneAnimation() {
  const tl = gsap.timeline({ defaults: { duration: 1 } });
  tl.to(iphone, { x: 0 })
    .to(iphone, { rotation: 0, scale: 0.9 })
    .to(iphone, { duration: 3, scale: 1 });
  return tl;
}

function widgetAnimation() {
  const tl = gsap.timeline();
  tl.to(widgets, { duration: 0, opacity: 1 });
  return tl;
}
function bgChange(){
  const tl = gsap.timeline();
  tl.to(".iphone_wrap", { duration:1,delay:1,backgroundColor: "rgba(0, 0, 0, 0.88)" });
  return tl;
}





/* function wordAnimation() {
  const tl = gsap.timeline();
  tl.to(word, { duration: 0, opacity: 1 });
  return tl;
}
 */



const animations = [
  {
    selector: "#app-store",
    duration: 3,
    scale: 0.9,
    x: 480,
    y: 100,
    ease: Power4.easeOut
  },
  {
    selector: "#screen-time",
    duration: 3,
    scale: 0.9,
    x: -500,
    y: -300,
    ease: Power2.easeOut
  },
  {
    selector: "#weather",
    duration: 3,
    scale: 1.1,
    x: -400,
    y: 350,
    ease: Power4.easeOut
  },
  {
    selector: "#stocks",
    duration: 3,
    scale: 0.9,
    x: 460,
    y: -170,
    ease: Power4.easeOut
  },
  {
    selector: "#fitness",
    duration: 3,
    scale: 1.1,
    x: -350,
    y: -30,
    ease: Power2.easeOut
  },
  {
    selector: "#find-my",
    duration: 3,
    scale: 1.1,
    x: 400,
    y: -360,
    ease: Power4.easeOut
  },
  {
    selector: "#calendar",
    duration: 3,
    scale: 0.9,
    x: -540,
    y: 0,
    ease: Power2.easeOut
  },

  {
    selector: "#wallet",
    duration: 3,
    scale: 1,
    x: -280,
    y: 120,
    ease: Power4.easeOut
  },
  {
    selector: "#apple-tv",
    duration: 3,
    scale: 1,
    x: 460,
    y: 350,
    ease: Power4.easeOut
  },
  {
    selector: "#sleep",
    duration: 3,
    scale: 0.9,
    x: 300,
    y: -50,
    ease: Power2.easeOut
  },
  {
    selector: "#socials",
    duration: 5,
    scale: 1,
    x: 330,
    y: 120,
    ease: Power2.easeOut
  },
  {
    selector: "#word",
    duration: 5,
    scale: 1,
    x: 330,
    y: 120,
    ease: Power2.easeOut
  },
  {
    selector: "#design",
    duration: 5,
    scale: 1,
    x: -180,
    y: 430,
    ease: Power2.easeOut
  },
  {
    selector: "#director",
    duration: 5,
    scale: 1,
    x: -328,
    y: -270,
    ease: Power2.easeOut
  },
  {
    selector: "#fit_swim",
    duration: 5,
    scale: 1,
    x: 330,
    y: 130,
    ease: Power2.easeOut
  },

];
const startTime = 2;
const masterTimeline = gsap.timeline();
masterTimeline.add(iPhoneAnimation()).add(widgetAnimation(), startTime).add(bgChange(),startTime);

animations.forEach((animation, index) => {
  const { selector, duration, scale, x, y, ease } = animation;
  const element = document.querySelector(selector);
  masterTimeline.add(
    gsap.to(element, { duration, scale, x, y, ease }),
    startTime + (index % 3) / 2
  );
});

ScrollTrigger.create({
  animation: masterTimeline,
  trigger: ".self_intro",
   start: "top top",
  scrub: 1,
  pin: true
});



 
//skill chart









/* Pararell animation */

let pTag1=document.querySelector('.parallel');
let textArr1='#CloneCoding #CloneCoding #CloneCoding #CloneCoding #CloneCoding'.split(' ');

let count1=0;
initTexts(pTag1,textArr1);
function initTexts(element, textArray){
    textArray.push(...textArray)

    for(let i=0; i<textArray.length; i++){
      element.innerHTML += `<span style="font-size: 9rem;">${textArray[i]}\u00A0\u00A0\u00A0`
    } 
}
////////////////
function animate(){
    count1++;
    count1 = marqueeText(count1,pTag1,-1)
    window.requestAnimationFrame(animate)
}
function marqueeText(count, element,direction){

   if(count>element.scrollWidth/2){
    count=0;
    element.style.transform=`translate(0,0)`;
   }
   element.style.transform=`translate(${count * direction}px,0)`;
   return count
}
function scrollHandler(){
  count1 += 100;
}
animate()
window.addEventListener('scroll',scrollHandler)




// st_article Animation
let tl11 = gsap.timeline();

tl11.to('.st_article', { autoAlpha: 1, duration: 1 })
  .to('.st_item', {
    keyframes: {
      x: [-1500, -1200, -1000, -800, -400, 0, 400, 800, 1000, 1200, 1500],
      y: [-100, 0, 0, 100, 0, 0],
      ease: 'power4.out'
    },
    duration: 2,
    stagger: 0.2, // Add stagger for a natural animation
    scrub: 2,
  });

ScrollTrigger.create({
  trigger: '.slide_span',
  start: 'top 80%',
  animation: tl11,
  toggleActions: 'play none none reverse'
});








//stage 이미지 비율커짐

function work(){
 /*  gsap.from(".line_inner",{
      scrollTrigger:{
          trigger:".stage",
          start:'top bottom',
          scrub:1.9
      },
      y:(i,el)=> (1 - el.getAttribute('data-speed'))
  })
 */

let Dslide = document.querySelectorAll(".D_slide");

  Dslide.forEach((item) => {
    let img1 = item.querySelector(".img-1");
  
    gsap.from(img1, {
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        scrub: 1.9
      },
      scale: 1.6
    });
  });

}
work()






//figma h2 TEXT
    let r = 0;

    hoge(document.getElementById("hello"),1,1);
    
    function hoge(dom,dx,dy){
    
      let str = "";
      r+=0.01;//*Math.random();
      let len=70;
      for(let i=0;i<len;i++){
          let xx = i*dx;
          let yy = i*dy;  
          let alpha = 1;
          
        if(i%2==0) str+=xx+"px "+yy+"px 0px #fff";
          else str+=xx+"px "+yy+"px 0px #000";
          
          if(i!=len-1) str+=",";
      }
    dom.style.textShadow=str;
      
    }

















// Responsive- shape 
let rec01Animation = gsap.from(".rec01", {
  duration: 3,
  rotation: 600,
  x: 750,
  ease: "power2.out"
});

ScrollTrigger.create({
  trigger: ".wr_shape",
  animation: rec01Animation,
  start: 'top 60%',
  end: 'bottom 30%',
  scrub: 1.9
});

// cir 요소에 대한 애니메이션 설정
let cirAnimation = gsap.from(".cir", {
  duration: 3,
  rotation: 720,
  x: 750,
  ease: "power2.out"
});

ScrollTrigger.create({
  trigger: ".wr_shape",
  animation: cirAnimation,
  start: 'top 70%',
  end: 'bottom 40%',
  scrub: 1.9
});

// rec02 요소에 대한 애니메이션 설정
let rec02Animation = gsap.from(".rec02", {
  duration: 3,
  rotation: 720,
  x: 750,
  ease: "power2.out"
});

ScrollTrigger.create({
  trigger: ".wr_shape",
  animation: rec02Animation,
  start: 'top 80%',
  end: 'bottom 50%',
  scrub: 1.9
});



//responsive_ BG

var blendAmount = 70;
var delay = -10;
var windowWidth = window.innerWidth;
var cardIn = document.getElementById("card_in");
var cardIn02 = document.getElementById("card_in_02");

document.onmousemove = function(e){
    mouseX = Math.round(e.pageX / windowWidth * 100 - delay);
    
    col1 = mouseX - blendAmount;
    col2 = mouseX + blendAmount;
    
    cardIn.style.background = "linear-gradient(to right, #4b5061 "+ col1 +"%, #a9ff3c "+ col2 +"%)";
    cardIn02.style.background = "linear-gradient(to right, #5b5941 "+ col1 +"%, #bc4fe5 "+ col2 +"%)";
}





/*  hor_scroll_ani */

let slider=document.querySelector('.hor_slider');
let slideWrapper=document.querySelector('.slider-wrapper');
let slides_1=document.querySelectorAll('.hor_slide');


function updateScaleAnPosition(){
  slides_1.forEach((slides_1)=>{
        let rect= slides_1.getBoundingClientRect();
        let centerPosition=(rect.left + rect.right) / 2;
        
        let distanceFromCenter=centerPosition;
        let scale;
        if(distanceFromCenter >0){
            scale=Math.min(1.75, 1 + distanceFromCenter / window.innerWidth)
        }else{
            scale=Math.min(0.5, 1 - Math.abs(distanceFromCenter) / window.innerWidth)
        }
        gsap.set(slides_1,{scale:scale})

    })
}
updateScaleAnPosition();

let horizon = gsap.to(slides_1,{
    xPercent:-97 * (slides_1.length - 1),
    scrollTrigger:{
        trigger:'.page_hor',
        start:'top top',
        end:"+=3000",
        scrub:1,
        pin:true,
        onUpdate:()=>{updateScaleAnPosition()}

    }
})







/* Pararell_02 animation */
 let pTag2 = document.querySelector('.parallel_025');
let textArr2 = '#React #React #React #React'.split(' ');

let count2 = 0;
initTexts(pTag2, textArr2);

function initTexts(element, textArray) {
    textArray.push(...textArray);

    for (let i = 0; i < textArray.length; i++) {
        element.innerHTML += `<span style="font-size: 9rem;">${textArray[i]}\u00A0\u00A0\u00A0`;
    }
}

function animate2() {
    count2++;
    count2 = marqueeText2(count2, pTag2, -1);
    window.requestAnimationFrame(animate2);
}

function marqueeText2(count, element, direction) {
    if (count > element.scrollWidth / 2) {
        count = 0;
        element.style.transform = `translate(0,0)`;
    }
    element.style.transform = `translate(${count * direction}px,0)`;
    return count;
}

function scrollHandler2() {
    count2 += 5;
}

animate2();
window.addEventListener('scroll', scrollHandler2); 





//React items Animation

let tl_t1 = gsap.timeline({
  scrollTrigger: {
    trigger: '.grid_item',
    start: 'top 40%',
    scrub: 2,
  }
});

tl_t1.to('.it_one', { y: 200, rotation: 0, duration: 2 })
  .to('.it_one', { x: 100, rotation: 100, duration: 2 })
  .to('.it_one', { y: 400, rotation: 100, duration: 2 })
  .to('.it_one', { x: -100, rotation: 100, duration: 2 })
  .to('.it_one', { y: 550, rotation: 100, duration: 2 })
  .to('.it_one', { x: 100, rotation: 100, duration: 2 })
  .to('.it_one', { y: 750, rotation: 100, duration: 2 })
  .to('.it_one', { x: -100, rotation: 100, duration: 2 })
  .to('.it_one', { y: 950, rotation: 100, duration: 2 });
   

  let tl_t2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.grid_item',
      start: 'top 40%',
      scrub: 1,
      duration: 7,
    }
  });
  
  tl_t2.to('.it_two', { y: 300, duration: 2 })
    .to('.it_two', { x: -150, rotation: 0, duration: 5 })
    .to('.it_two', { y: 400, rotation: 90, duration: 5 })
    .to('.it_two', { x: 100, rotation: 180, duration: 5 })
    .to('.it_two', { y: 700, rotation: 270, duration: 5 })
    .to('.it_two', { x: -170, rotation: 360, duration: 5 })
    .to('.it_two', { y: 800, rotation: 450, duration: 5 });
 





/* Pararell_03 animation */
let pTag3 = document.querySelector('.parallel_03');
let textArr3 = '#3D_part #3D_part #3D_part #3D_part'.split(' ');

let count3 = 0;
initTexts(pTag3, textArr3);

function initTexts(element, textArray) {
    textArray.push(...textArray);

    for (let i = 0; i < textArray.length; i++) {
        element.innerHTML += `<span style="font-size: 9rem;">${textArray[i]}\u00A0\u00A0\u00A0`;
    }
    element.style.width = '100vh';
}

function animate3() {
  count3++;
  count3 = marqueeText3(count3, pTag3, -1);
    window.requestAnimationFrame(animate3);
}

function marqueeText3(count, element, direction) {
    if (count > element.scrollWidth / 2) {
        count = 0;
        element.style.transform = `translate(0,0)`;
    }
    element.style.transform = `translate(${count * direction}px,0)`;
    return count;
}

function scrollHandler3() {
  count3 += 5;
}

animate3();
window.addEventListener('scroll', scrollHandler3);








// 3D animation
function animateWhisk() {
  gsap.from(".h2whisk, .whiskP", {
    scrollTrigger: {
      trigger: ".con_whisk",
      start: 'top bottom',
      scrub: 1.9
    },
    y: (i, el) => (1 - el.getAttribute('data-speed'))
  });
}

function animateIcecream() {
  let videoAni01 = document.querySelector(".ice_video");
  gsap.from(videoAni01, {
    scrollTrigger: {
      trigger: ".con_icecream",
      start: 'top 70%',
      scrub: 1.9,
    },
    scale: 1.1
  });

}

function animateMoll() {
  let videoAni02 = document.querySelector(".moll_vedio");
  gsap.from(videoAni02, {
    scrollTrigger: {
      trigger: ".con_mollang",
      start: 'top 70%',
      scrub: 1.9,
    },
    scale: 1.1
  });

}




function animateFamil() {

  let videoAni03 = document.querySelector(".fam_video");
  gsap.from(videoAni03, {
    scrollTrigger: {
      trigger: ".con_family",
      start: 'top 70%',
      scrub: 1.9,
    },
    scale: 1.1
  });

}

animateWhisk();
animateIcecream();
animateMoll();
animateFamil();






//flower_work title
let s = 0; // Use a different variable name to avoid conflict

applyTextShadow(document.getElementById("hello02"), 0.5, 1);

function applyTextShadow(dom, dx, dy) {
  let str = "";
  s += 0.01; // Use a different variable name
  let len = 70;

  for (let i = 0; i < len; i++) {
    let xx = i * dx;
    let yy = i * dy;
    let alpha = 1;

    if (i % 2 == 0) str += xx + "px " + yy + "px 0px #89449e"; 
    else str += xx + "px " + yy + "px 0px #000000"; 

    if (i != len - 1) str += ",";
  }

  dom.style.textShadow = str;
}







///___flower_work

function alternate(){
  colsno = window.getComputedStyle(document.getElementById("grid")).gridTemplateColumns.split(' ').length;
  smallgrids = document.getElementsByClassName("smallgrid");
  for(i=0;i<smallgrids.length;i++){
    thisrow = Math.floor(i/colsno);
    thiscol = i%colsno;
    if((thisrow+thiscol)%2==1){
      smallgrids[i].setAttribute('class', 'smallgrid even');
    }else{
      smallgrids[i].setAttribute('class', 'smallgrid odd');
    }
  }
}

window.onload = alternate();
window.addEventListener("resize", alternate);



