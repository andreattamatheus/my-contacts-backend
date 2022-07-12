const { v4 } = require('uuid');
const db = require('../../database');

let contacts = [
    {
        id: v4(),
        name: 'Matheus',
        email: 'matheus.andreatta@teste.com.br',
        phone: '88888-7777',
        category_id: v4(),
    },
];

class ContactsRepository {
    findAll(){
        //Resolve e Reject. O Reject não vem como parâmetro, pois não tratamos
        //exceção no repository
        return new Promise((resolve) => resolve(contacts));
    }

    findById(id){
        return new Promise((resolve) => resolve(
            contacts.find((contact) => contact.id === id)
        ));
    }

    findByEmail(email){
        return new Promise((resolve) => resolve(
            contacts.find((contact) => contact.email === email)
        ));
    }

    delete(id){
        return new Promise((resolve) => {
            contacts = contacts.filter((contact) => contact.id !== id);
            resolve();
        });
    }

    async create({name, email, phone, category_id}){
        const { row } = await db.query(
            `INSERT INTO CONTACTS (name, email, phone, category_id)
            VALUES($1, $2, $3, $4)
            RETURNING *`
            ,
            [ name, email, phone, category_id ] );

        return row;

    }

    update(id,{name,phone,email,category_id}){
        return new Promise((resolve) => {
            const updatedContact = {
                id,
                name,
                phone,
                email,
                category_id
            };

            contacts = contacts.map((contact) => (
                contact.id === id ? updatedContact : contact
            ));
            resolve(updatedContact);
        })
    }
}


module.exports = new ContactsRepository();
