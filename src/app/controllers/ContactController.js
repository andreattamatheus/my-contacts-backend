const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }
    return response.json(contact);
  }

  async store(request, response) {
    const {
      name, phone, email, category_id,
    } = request.body;
    const contactExists = await ContactsRepository.findByEmail(email);

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (contactExists.length > 0) {
      return response
        .status(400)
        .json({ error: 'The email is already taken' });
    }

    const contact = await ContactsRepository.create({
      name,
      phone,
      email,
      category_id,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, phone, email, category_id,
    } = request.body;

    const contactExits = await ContactsRepository.findById(id);

    if (!contactExits) {
      return response.status(400).json({ error: 'Contact doesnt exist' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      phone,
      email,
      category_id,
    });
    response.send(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(400).json({ error: 'Contact doesnt exist' });
    }
    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
