var blurb = {
    id: 'pagination-buttons',
    activeButton: 'active',
    currentPage: 1,
    recordsPerPage: 6,
    param: ['blurb', 'button', 'arrow'],
    blurbs: [
        {
            imgSrc: '../img/blurb_smal_dog.jpg',
            imgAlt: 'smal dog',
            text: 'Keeping Your Dog’s Coat Healthy'
        },
        {
            imgSrc: '../img/blurb_sleep_cat.jpg',
            imgAlt: 'sleep cat',
            text: 'Why Do Cats Sleep So Much?'
        },
        {
            imgSrc: '../img/blurb_big_dog.jpg',
            imgAlt: 'big dog',
            text: '10 Reasons For German Shepherds'
        },
        {
            imgSrc: '../img/blurb_see_cat.jpg',
            imgAlt: 'see cat',
            text: 'How to Keep Your Cat Healthy'
        },
        {
            imgSrc: '../img/blurb_turtle_head.jpg',
            imgAlt: 'turtle head',
            text: 'Reasons Why Reptiles Make Good Pets'
        },
        {
            imgSrc: '../img/blurb_yawn_cat.jpg',
            imgAlt: 'yawn cat',
            text: 'The Secret Life of Cats Revealed'
        },
        {
            imgSrc: '../img/blurb_rabbit.jpg',
            imgAlt: 'rabbit',
            text: '10 Tips For Looking After Rabbits'
        },
        {
            imgSrc: '../img/blurb_big_black_dog.jpg',
            imgAlt: 'big black dog',
            text: '12 Tips For A Healthy, Happy Indoor Dog'
        },
        {
            imgSrc: '../img/blurb_smal_duty_dog.jpg',
            imgAlt: 'smal duty dog',
            text: 'Great Breeds For People Who Want Small Dogs'
        }
    ]
}

var testimonial = {
    id: 'pagination-buttons-testimonial',
    activeButton: 'active-button-testimonial',
    currentPage: 1,
    recordsPerPage: 1,
    param: ['blurb', 'button'],
    blurbs: [
        {
            imgSrc: '../img/lettie_hubbard.jpg',
            imgAlt: 'Lettie Hubbard',
            text: 'Lettie Hubbard'
        },
        {
            imgSrc: '../img/sharlene_wilson.jpg',
            imgAlt: 'Sharlene Wilson',
            text: 'Sharlene Wilson'
        }
    ]
}

if (document.getElementById(blurb.id)) {
    createPaginationButtons(blurb);
    calcPagination(blurb);
}

if (document.getElementById(testimonial.id)) {
    createPaginationButtons(testimonial);
    calcPagination(testimonial);
}

createAccordion();

// const viewer = new Viewer(document.getElementById('smal-pets-viewer'), {
//     inline: true,
//     viewed() {
//         viewer.zoomTo(1);
//     },
// });

function createPaginationButtons(obj) {
    // Create arrows
    try {
        document.getElementById('pagination-back').href = 'javascript:prevPage(blurb)';
        document.getElementById('pagination-forward').href = 'javascript:nextPage(blurb)';
    } catch (error) {
        console.log("'pagination-back' and 'pagination-forward' doesn't find");
    }
    // Create buttons 
    var paginationButtons = '';

    for (let i = 1; i < numPages(obj) + 1; i++) {
        if (obj.id === 'pagination-buttons') {
            paginationButtons += `<a href="javascript:calcPagination(blurb, ${i})">${i}</a>`;
        } else {
            paginationButtons += `<a href="javascript:calcPagination(testimonial, ${i})"></a>`;
        }
    }

    // try {
    document.getElementById(obj.id).innerHTML = paginationButtons;
    // } catch{
    // console.log("'" + obj.id + "' doesn't find");
    // }
}

function calcPagination(obj, page) {
    if (page) {
        obj.currentPage = page;
    }
    if (obj.param.includes('blurb')) {
        calcBlurbs(obj);
    }
    if (obj.param.includes('button')) {
        activeButton(obj);
    }
    if (obj.param.includes('arrow')) {
        showArrowButtons(obj);
    }
    // if (obj.id === 'pagination-buttons-testimonial') {
    //     setTimeout(timerPagination(obj), 0.1);
    // }
    // setTimeout(calcPagination(obj), 1000);
}

function calcBlurbs(obj) {
    var blurb = '';

    var blurbStart = (obj.currentPage - 1) * obj.recordsPerPage;
    var blurbEnd = obj.recordsPerPage * obj.currentPage;

    // try {
    if (blurbEnd > obj.blurbs.length) {
        blurbEnd = obj.blurbs.length;
    }

    for (let i = blurbStart; i < blurbEnd; i++) {
        if (obj.id === 'pagination-buttons') {
            blurb += `
                        <div class="expert-advice-blurb">
                            <img class="blurb-header" src="${obj.blurbs[i].imgSrc}" alt="${obj.blurbs[i].imgAlt}">
                                <div class="expert-advice-blurb-text">
                                    <h3 class="light">${obj.blurbs[i].text}</h3>
                                    <p>
                                        Quisque id leo non dolor tempor elementum quis ac urna. Nam pharetra, ligula eget
                                        finibus dignissim, turpis ipsum sollicitudin sem, sed vestibulum dui nisi ut purus.
                                        Quisque varius odio ante, ac viverra.
                                    </p>
                                    <a href="contact.html">Read More &gt;</a>
                                </div>
                        </div>`;
        }
        if (obj.id === 'pagination-buttons-testimonial') {
            blurb += `
                            <img src="${obj.blurbs[i].imgSrc}" alt="${obj.blurbs[i].imgAlt}">
                            <p><i>
                                “I love animals and feel very strongly that people should not be allowed to buy a pet if
                                they are not able to look after it. Until one has loved an animal, a part of one’s soul
                                remains unawakened.”
                                </i></p>
                            <p>${obj.blurbs[i].text}</p>`;
        }
    }

    document.getElementById('blurb-js').innerHTML = blurb;
    // } catch{
    //     console.log("'blurb-js' doesn't find");
    // }
}

function activeButton(obj) {
    // try {
    var buttons = document.getElementById(obj.id).children;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove(obj.activeButton);
    }
    buttons[obj.currentPage - 1].classList.add(obj.activeButton);
    // } catch (error) {
    //     console.log("'pagination-buttons' doesn't find");
    // }
}

function showArrowButtons(obj) {
    // try {
    if (obj.currentPage > 1) {
        document.getElementById('pagination-back').style.display = "block";
    } else {
        document.getElementById('pagination-back').style.display = "none";
    }

    if (obj.currentPage < numPages(obj)) {
        document.getElementById('pagination-forward').style.display = "block";
    } else {
        document.getElementById('pagination-forward').style.display = "none";
    }
    // } catch (error) {
    //     console.log("'pagination-forward' and 'pagination-back' doesn't find");
    // }
}

function prevPage(obj) {
    if (obj.currentPage > 1) {
        obj.currentPage--;
        calcPagination(obj);
    }
}

function nextPage(obj) {
    if (obj.currentPage < numPages(obj)) {
        obj.currentPage++;
        calcPagination(obj);
    }
}

function numPages(obj) {
    return Math.ceil(obj.blurbs.length / obj.recordsPerPage);
}

// function timerPagination(obj) {
// console.log(obj.currentPage);
// if (obj.currentPage < numPages(obj)) {
//     obj.currentPage++;
// } else {
//     obj.currentPage = 1;
// }
// console.log(obj.currentPage);
// calcPagination(obj);
// }

function vetMenu() {
    var x = document.getElementById("menu-mobile");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function createAccordion() {
    var acc = document.getElementsByClassName("frequently-asked-questions-accordion-container");

    try {
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                var panel = this.children[1];

                this.children[0].children[0].children[1].classList.toggle("fa-plus");
                this.children[0].children[0].children[1].classList.toggle("fa-minus");
                for (let j = 0; j < acc.length; j++) {
                    if (acc[j] == this) {
                        if (panel.style.display === "block") {
                            panel.style.display = "none";
                        } else {
                            panel.style.display = "block";
                        }
                    } else {
                        acc[j].children[1].style.display = "none";
                        acc[j].children[0].children[0].children[1].classList.replace("fa-minus",
                            "fa-plus");
                    }
                }
            });
        }
    } catch {
        console.log("'frequently-asked-questions-accordion-container' doesn't find");
    }
}