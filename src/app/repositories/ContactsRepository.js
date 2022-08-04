const { v4 } = require('uuid');
const db = require('../../database');

let contacts = [
  {
    id: v4(),
    name: 'Matheus',
    email: 'matheus.andreatta@teste.com.br',
    phone: '88888-7777',
    category_id: null,
    category_name: null,
  },
  {
    id: v4(),
    name: 'Teseu',
    email: 'teseu.kratos@olimpo.com.br',
    phone: '99999-7777',
    category_id: v4(),
    category_name: 'Instagram',
  },
];

class ContactsRepository {
  async findAll(orderBy) {
    const rows = await db.query(
      `SELECT * FROM CONTACTS ORDER BY name ${orderBy}`,
    );
    return rows;
  }

  async findById(id) {
    const row = await db.query(
      `SELECT * FROM CONTACTS where id = '${id}'`,
    );
    return row;
  }

  async findByEmail(email) {
    const row = await db.query(
      `SELECT * FROM CONTACTS where email = '${email}'`,
    );
    return row;
  }

  async findByName(name) {
    const row = await db.query(
      `SELECT * FROM CONTACTS where email like ${name}% `,
    );
    return row;
  }

  async delete(id) {
    const row = await db.query(
      `DELETE * FROM CONTACTS where id = "${id}"`,
    );
    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const { row } = await db.query(
      `INSERT INTO CONTACTS (name, email, phone, category_id)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
      [name, email, phone, category_id],
    );

    return row;
  }

  async update(id, {
    name, phone, email, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        phone,
        email,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));
      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
