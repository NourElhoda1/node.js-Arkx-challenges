const readline = require('readline');

// Create the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Contacts
const contacts = [];

// Add contact
function addContact() {
    rl.question('Enter the name: ', name => {
        rl.question('Enter the number: ', num => {
            contacts.push({ name, num });
            console.log('Saved');
            menu();
        });
    });
}

// View all contacts
function viewAll() {
    if (contacts.length === 0) {
        console.log('No Contacts Available');
    } else {
        console.log('Contacts:');
        for (let i = 0; i < contacts.length; i++) {
            console.log(`Name: ${contacts[i].name}, Phone: ${contacts[i].num}\n`);
        }
    }
    menu();
}

// Search Contact
function searchContact() {
    rl.question('Enter the name: ', shname => {
        const contact = contacts.find(contact => contact.name === shname);
        if (contact) {
            console.log(`Name: ${contact.name}, Phone: ${contact.num}\n`);
        } else {
            console.log('Not Found');
        }
        menu();
    });
}

// Menu
function menu() {
    console.log('Choose an option:');
    console.log('1. Add a contact');
    console.log('2. View all contacts');
    console.log('3. Search for a contact');
    console.log('4. Exit');
    rl.question('Choice: ', choice => {
        switch (choice) {
            case '1':
                addContact();
                break;
            case '2':
                viewAll();
                break;
            case '3':
                searchContact();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Invalid Choice. Try again');
                menu();
                break;
        }
    });
}

// Start the application
menu();