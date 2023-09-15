document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the HTML elements you'll be working with
    const itemList = document.getElementById('item-list');
    const itemForm = document.getElementById('item-form');
  
    // Function to fetch and display items from the server
    const fetchItems = () => {
      fetch('/api/items')
        .then((response) => response.json())
        .then((items) => {
          // Clear the item list
          itemList.innerHTML = '';
  
          // Loop through items and create HTML elements for each
          items.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            `;
            itemList.appendChild(itemElement);
          });
        })
        .catch((error) => console.error('Error fetching items:', error));
    };
  
    // Function to handle form submission and add new items to the server
    itemForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const formData = new FormData(itemForm);
      const newItem = {
        name: formData.get('name'),
        description: formData.get('description'),
      };
  
      fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
        .then((response) => response.json())
        .then(() => {
          // Clear the form fields and fetch updated item list
          itemForm.reset();
          fetchItems();
        })
        .catch((error) => console.error('Error adding item:', error));
    });
  
    // Fetch and display items when the page loads
    fetchItems();
  });
  