const team = ['Janette Austin', 'Ann Penn', 'Austin Pow'];
let img = document.createElement('img');
let src = document.querySelector('.appointment-message-wrapper')

let i = 0

team.forEach(element => {
    document.querySelector(`.team-member-${i + 1}`).innerText = team[i];
    i += 1
});

document.querySelector('.mobile-hamburger').addEventListener('click', function () {
    document.querySelector('.open-menu-holder').classList.toggle('open');
});

document.querySelector('.mobile-menu-close').addEventListener('click', function () {
    document.querySelector('.open-menu-holder').classList.toggle('open');
});

const createAppoinment = (appoinment) => {
    const appointmentMessage = document.querySelector('.appointment-message');

    const freeTeamMember = () => {
        let randomMember = Math.floor(Math.random() * team.length);
        let freeMember = team[randomMember];

        return { randomMember, freeMember };
    }

    let memberInfo = freeTeamMember();
    let randomMember = memberInfo.randomMember;
    freeMember = memberInfo.freeMember;

    fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
        headers: {
            'Content-type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(appoinment)
    })
        .then(res => res.json())
        .then(resJSON => {
            // let memberInfo = freeTeamMember();
            // let randomMember = memberInfo.randomMember;
            // freeMember = memberInfo.freeMember;

            appointmentMessage.classList.add('sent');
            appointmentMessage.innerText = `Dear ${resJSON.appointment.name}, thank You for making your appointment for ${resJSON.appointment.service} on ${resJSON.appointment.time}, ${resJSON.appointment.date}. Your massage specialist will be ${freeMember}`;
            img.src = `img/team-${randomMember + 1}.jpg`
            src.appendChild(img);
        });
}

document.querySelector('#appointment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const appointmentMessage = document.querySelector('.appointment-message');
    let formFields = document.getElementsByClassName('form-field');
    let allFields = false;
    let appoinment = {
        name: document.querySelector('#appointment-name').value,
        email: document.querySelector('#appointment-email').value,
        phone: document.querySelector('#appointment-phone').value,
        date: document.querySelector('#appointment-date').value,
        time: document.querySelector('#appointment-time').value,
        service: document.querySelector('#appointment-service').value,
        message: document.querySelector('#appointment-message').value,
    }

    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].value === '') {
            // allFields = true;
            allFields = false;
            formFields[i].classList.add('error');
            console.log('error');
        } else {
            allFields = true;
            formFields[i].classList.remove('error');
        }
    }

    if (allFields) {
        createAppoinment(appoinment);
    } else {
        appointmentMessage.classList.add('error');
        appointmentMessage.innerText = 'Please fill in all fields';
    }

});