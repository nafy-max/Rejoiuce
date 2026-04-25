function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}
locomotive();

var page2 = document.querySelector("#page2");
var cursor = document.querySelector("#cursor");

// 1. Move the cursor with the mouse
page2.addEventListener("mousemove", function(details) {
    gsap.to(cursor, {
        x: details.x,
        y: details.y,
        duration: 0.6,
        ease: "power2.out"
    });
});

// 2. Scale up and show when entering Page 2
page2.addEventListener("mouseenter", function() {
    gsap.to(cursor, {
        scale: 1,
        opacity: 1
    });
});

// 3. Scale down and hide when leaving Page 2
page2.addEventListener("mouseleave", function() {
    gsap.to(cursor, {
        scale: 0,
        opacity: 0
    });
});

const tl = gsap.timeline();

tl.from("nav h3, nav ul li", {
    y: -50,
    opacity: 0,
    delay: 0.5,
    duration: 0.8,
    stagger: 0.1
});
window.addEventListener("load", function() {
    const heroHead = document.querySelectorAll(".hero-heading");

    if(heroHead.length > 0) {
        gsap.from(heroHead, {
            y: 300,            
            rotate: 15,        
            opacity: 0,        
            duration: 0.8,
            stagger: 0.1,      
            ease: "power4.out",
            onComplete: () => {
                gsap.set(heroHead, { clearProps: "all" }); 
            }
        });
    }
});

tl.from("#page1 .bottom", {
    opacity: 0,
    y: 30,
    duration: 0.8
}, "-=0.5");

gsap.from("#page2 video", {
    scale: 0.8,
    borderRadius: "50px",
    scrollTrigger: {
        trigger: "#page2",
        scroller: "#main",
        start: "top 80%",
        end: "top 0%",
        scrub: true
    }
});

gsap.from(".about-content h3", {
    y: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".about-content",
        scroller: "#main",
        start: "top 90%",
        end: "top 40%",
        scrub: 2
    }
});

gsap.from("#about-content .left h5, #about-content .right p", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
        trigger: "#about-content",
        scroller: "#main",
        start: "top 95%",
        end: "top 70%",
        scrub: 1
    }
});

gsap.from("hr", {
    width: "0%",
    duration: 1,
    scrollTrigger: {
        trigger: "hr",
        scroller: "#main",
        start: "top 95%",
        scrub: 1
    }
}); 


function highlightAnimation() {
    var allCards = document.querySelectorAll(".highlight-card");

    allCards.forEach(function (card) {
        var video = card.querySelector("video");

        card.addEventListener("mouseenter", function () {
            // Added error handling for the play promise
            var playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Automatic playback started!
                }).catch(error => {
                    console.log("Playback failed:", error);
                });
            }

            gsap.to(video, {
                scale: 1,
                opacity: 1,
                duration: 0.3
            });
        });

        card.addEventListener("mouseleave", function () {
            video.pause();
            gsap.to(video, {
                scale: 0,
                opacity: 0,
                duration: 0.3
            });
        });

        card.addEventListener("mousemove", function (dets) {
            const rect = card.getBoundingClientRect();
            const x = dets.clientX - rect.left;
            const y = dets.clientY - rect.top;

            gsap.to(video, {
                x: x,
                y: y,
                duration: 0.6,
                ease: "power3.out"
            });
        });
    });
}

highlightAnimation();


function navbar() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.querySelector("nav ul");
    const navLinks = document.querySelectorAll("nav ul li");

    let isOpen = false;

    const navTL = gsap.timeline({ paused: true });

    // Slide menu from right
    navTL.to(navMenu, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
        pointerEvents: "auto"
    });

    // Stagger links
    navTL.to(navLinks, {
        x: 50,
        opacity:1,
        stagger: 0.1,
        duration: 0.4,
        ease: "power3.out"
    }, "-=0.3");

    navToggle.addEventListener("click", () => {

        if (!isOpen) {
            navTL.play();
            document.body.style.overflow = "hidden";
        } else {
            navTL.reverse();
            document.body.style.overflow = "auto";
        }

        navToggle.classList.toggle("ri-menu-line");
        navToggle.classList.toggle("ri-close-line");

        isOpen = !isOpen;
    });
}

navbar();