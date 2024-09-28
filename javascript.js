const eventForm = document.getElementById('event-form');
const eventList = document.getElementById('event-list');
const eventSelect = document.getElementById('event-select');
const registerButton = document.getElementById('register-button');
const myEventsList = document.getElementById('my-events-list');

let events = [];
let registeredEvents = [];

eventForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventTime = document.getElementById('event-time').value;
    const eventLocation = document.getElementById('event-location').value;
    const eventDescription = document.getElementById('event-description').value;

    const newEvent = {
        id: events.length + 1,
        name: eventName,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        description: eventDescription
    };

    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));

    // Add event to event list
    const eventItem = document.createElement('li');
    eventItem.setAttribute('data-event-id', newEvent.id);
    eventItem.innerHTML = `
        <h3>${eventName}</h3>
        <p>Date: ${eventDate}</p>
        <p>Time: ${eventTime}</p>
        <p>Location: ${eventLocation}</p>
        <p>${eventDescription}</p>
        <button class="register-button">Register</button>
    `;
    eventList.appendChild(eventItem);

    // Add event to event select
    const option = document.createElement('option');
    option.value = newEvent.id;
    option.text = eventName;
    eventSelect.appendChild(option);

    eventForm.reset();
});

eventList.addEventListener('click', (event) => {
    if (event.target.classList.contains('register-button')) {
        const eventId = event.target.parentElement.parentElement.getAttribute('data-event-id');
        const eventToRegister = events.find(event => event.id === parseInt(eventId));

        if (!registeredEvents.includes(eventToRegister)) {
            registeredEvents.push(eventToRegister);
            localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));

            const myEventItem = document.createElement('li');
            myEventItem.innerHTML = `
                <h3>${eventToRegister.name}</h3>
                <p>Date: ${eventToRegister.date}</p>
                <p>Time: ${eventToRegister.time}</p>
                <p>Location: ${eventToRegister.location}</p>
                <p>${eventToRegister.description}</p>
            `;
            myEventsList.appendChild(myEventItem);
        }
    }
});

registerButton.addEventListener('click', () => {
    const selectedEventId = eventSelect.value;
    const eventToRegister = events.find(event => event.id === parseInt(selectedEventId));

    if (!registeredEvents.includes(eventToRegister)) {
        registeredEvents.push(eventToRegister);
        localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));

        const myEventItem = document.createElement('li');
        myEventItem.innerHTML = `
            <h3>${eventToRegister.name}</h3>
            <p>Date: ${eventToRegister.date}</p>
            <p>Time: ${eventToRegister.time}</p>
            <p>Location: ${eventToRegister.location}</p>
            <p>${eventToRegister.description}</p>
        `;
        myEventsList.appendChild(myEventItem);
    }
});

// Load events from local storage on page load
const storedEvents = JSON.parse(localStorage.getItem('events'));
const storedRegisteredEvents = JSON.parse(localStorage.getItem('registeredEvents'));

if (storedEvents) {
    events = storedEvents;
    storedEvents.forEach((event) => {
        const eventItem = document.createElement('li');
        eventItem.setAttribute('data-event-id', event.id);
        eventItem.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Location: ${event.location}</p>
            <p>${event.description}</p>
            <button class="register-button">Register</button>
        `;
        eventList.appendChild(eventItem);

        // Add event to event select
        const option = document.createElement('option');
        option.value = event.id;
        option.text = event.name;
        eventSelect.appendChild(option);
    });
}

if (storedRegisteredEvents) {
    registeredEvents = storedRegisteredEvents;
    storedRegisteredEvents.forEach((event) => {
        const myEventItem = document.createElement('li');
        myEventItem.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Location: ${event.location}</p>
            <p>${event.description}</p>
        `;
        myEventsList.appendChild(myEventItem);
    });
}