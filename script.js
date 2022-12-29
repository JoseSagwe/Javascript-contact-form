const form = document.getElementById('contact-form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get('name');
  const fromEmail = formData.get('email');
  const phone = formData.get('tel');
  const subject = formData.get('subject');
  const mailto = "josephsagwe421@gmail.com";
  const subject2 = "Confirmation: Message was submitted successfully | HMA WebDesign";
  const message = `Cleint Name: ${name}\nPhone Number: ${phone}\n\nClient Message:\n${formData.get('message')}`;
  const message2 = `Dear ${name}\nThank you for contacting us. We will get back to you shortly!\n\nYou submitted the following message:\n${formData.get('message')}\n\nRegards,\n- HMA WebDesign`;
  const headers = `From: ${fromEmail}`;
  const headers2 = `From: ${mailto}`;

  fetch('/send-email', {
    method: 'POST',
    body: JSON.stringify({ mailto, subject, message, headers, subject2, message2, headers2 }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to send email');
    })
    .then(result => {
      if (result.success) {
        form.reset();
        alert('Your Message was sent Successfully!');
      } else {
        alert('Sorry! Message was not sent, Try again Later.');
      }
    })
    .catch(error => console.error(error));
});
