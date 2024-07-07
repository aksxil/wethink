gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});








// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var tl = gsap.timeline();

tl.to("#loader",{
  height:0,
  duration:1,
})
tl.from("#page1 h1",{
  y:"100%",
  opacity:0,
  rotate:8,
  duration:.5
})


gsap.to("#page2 video", {
  width: "120%",
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    start: "top 80%",
    end: "top -40%",
    scrub: true,
  }
})

gsap.from("#page3 h1", {
  rotate: 5,
  y: 100,
  opacity: 0,
  stagger: 1,
  scrollTrigger: {
    trigger: "#page3 h1",
    scroller: "#main",
    start: "top 60%",
    end: "top 40%",
    scrub: 3
  }
})

document.addEventListener("mousemove", function (dets) {
  document.querySelector("#cursor").style.left = `${dets.x + 38}px`
  document.querySelector("#cursor").style.top = `${dets.y + 20}px`
})

var all = document.querySelectorAll(".box")
all.forEach(function(e){

  e.addEventListener("mouseenter",function(){
    document.querySelector("#cursor").style.scale =1
    document.querySelector("#cursor").style.scale = 3.5
    // document.querySelector("#cursor").style.backgroundColor = "#000"
    // document.querySelector("#cursor").style.borderColor = "#000"
  })
  e.addEventListener("mouseleave",function(){
    
    document.querySelector("#cursor").style.scale = 0
    // document.querySelector("#cursor").style.backgroundColor = "transparent"
    // document.querySelector("#cursor").style.borderColor = "#e1e1e1"
  })
  
})

gsap.to("#page7 h1",{
  x:"-120%",
  scrollTrigger:{
    trigger:"#page7 ",
    scroller:"#main",
    start:"top 0%",
    end:"top -80%",
    scrub:3,
    pin:true
  }
})
gsap.to("#nav",{
  y:"-55%",
  opacity:0,
  duration:2,
  scrollTrigger:{
    trigger:"#page7 ",
    scroller:"#main",
    start:"top 0%",
    end:"top -50%",
    scrub:2
  }
})

gsap.from("#page10 h1", {
  // rotate: 5,
  y: 100,
  opacity: 0,
  stagger: 1,
  scrollTrigger: {
    trigger: "#page10 h1",
    scroller: "#main",
    start: "top 60%",
    end: "top 40%",
    scrub: 2
  }
})