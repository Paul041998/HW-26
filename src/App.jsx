import { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import AddContactForm from "./components/AddContactForm";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("contacts");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("contacts"));
    if (saved && saved.length > 0) {
      setContacts(saved);
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
          const initialContacts = data.map((user) => ({
            firstName: user.name.split(" ")[0] || "",
            lastName: user.name.split(" ")[1] || "",
            phone: user.phone,
          }));
          setContacts(initialContacts);
          localStorage.setItem("contacts", JSON.stringify(initialContacts));
        })
        .catch((err) => console.error("Помилка завантаження контактів:", err));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
    setPage("contacts");
  };

  const deleteContact = (phone) => {
    setContacts(contacts.filter((c) => c.phone !== phone));
  };

  return (
    <div className="app">
      <header>
        <button
          className={page === "contacts" ? "active" : ""}
          onClick={() => setPage("contacts")}
        >
          Contacts
        </button>
        <button
          className={page === "add" ? "active" : ""}
          onClick={() => setPage("add")}
        >
          Add contact
        </button>
      </header>

      <main>
        {page === "contacts" ? (
          <ContactList contacts={contacts} onDelete={deleteContact} />
        ) : (
          <AddContactForm
            onSave={addContact}
            onCancel={() => setPage("contacts")}
          />
        )}
      </main>
    </div>
  );
}
