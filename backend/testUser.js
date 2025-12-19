// testUser.js
const testUser = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: "12345",
        name: "Stefano Mauro",
        email: "stefano.mauro04@gmail.com",
        imageURL: "https://linkallafoto.com/avatar.jpg",
        online: false,
      }),
    });

    const data = await res.json();
    console.log("✅ Risposta dal server:", data);
  } catch (err) {
    console.error("❌ Errore fetch:", err);
  }
};

testUser();
