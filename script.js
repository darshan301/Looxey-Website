document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- CART LOGIC ---------------- */

  const cart = {}
  const cartItems = document.getElementById("cartItems")
  const totalAmount = document.getElementById("totalAmount")

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name
      const price = parseInt(btn.dataset.price)

      if (cart[name]) {
        cart[name].qty++
      } else {
        cart[name] = { price, qty: 1 }
      }
      renderCart()
    })
  })

  function renderCart() {
    cartItems.innerHTML = ""
    let total = 0

    Object.keys(cart).forEach(name => {
      const item = cart[name]
      const amount = item.price * item.qty
      total += amount

      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${name}</td>
        <td>${item.qty}</td>
        <td>₹${item.price}</td>
        <td>₹${amount}</td>
        <td>
          <button class="remove-btn" onclick="removeItem('${name}')">❌</button>
        </td>
      `
      cartItems.appendChild(tr)
    })

    totalAmount.textContent = total
  }

  window.removeItem = function(name) {
    delete cart[name]
    renderCart()
  }

  /* ---------------- CONTACT FORM LOGIC ---------------- */

  const form = document.getElementById("contactForm")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()   // ⛔ stop page reload

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    }

    try {
      const res = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      const msg = await res.text()
      alert(msg)
      form.reset()

    } catch (err) {
      alert("Server error. Try again.")
    }
  })

})