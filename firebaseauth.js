import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2ZUnBI2V031KE3vSsIvEVlLDrxsNU9aw",
  authDomain: "contact-form-c856f.firebaseapp.com",
  projectId: "contact-form-c856f",
  storageBucket: "contact-form-c856f.firebasestorage.app",
  messagingSenderId: "974856790603",
  appId: "1:974856790603:web:793dcec793afee3f43e3ce"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

emailjs.init("OLSdcomIBrrkqJSI5");

const SERVICE_ID = "service_gecy4ef";
const TEMPLATE_ID = "template_20yzi5p";

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      statusText.innerText = "Please fill all fields.";
      return;
    }

    try {
      sendBtn.innerText = "Sending...";
      sendBtn.disabled = true;

      await addDoc(collection(db, "contacts"), {
        name,
        email,
        subject,
        message,
        createdAt: serverTimestamp()
      });

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name,
        email,
        subject,
        message
      });

      statusText.innerText = "Message sent successfully!";
      form.reset();

    } catch (error) {
      console.error(error);
      statusText.innerText = "Error! Message not sent.";
    }

    sendBtn.innerText = "Send Message";
    sendBtn.disabled = false;
  });
}
