document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.querySelector('.gallery-grid');

    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const imageCaption = document.getElementById('imageCaption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    let filteredImages = Array.from(galleryItems);

    // --- Image Filtering ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.dataset.filter;

            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter images
            filteredImages = [];
            galleryItems.forEach(item => {
                const itemCategory = item.classList.contains(filterValue);
                const isVisible = (filterValue === 'all' || itemCategory);
                
                if (isVisible) {
                    item.classList.remove('hide');
                    filteredImages.push(item);
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // --- Lightbox/Modal functionality ---
    galleryGrid.addEventListener('click', (e) => {
        const clickedItem = e.target.closest('.gallery-item');
        if (clickedItem) {
            const imageSrc = clickedItem.querySelector('img').src;
            const imageAlt = clickedItem.querySelector('img').alt;

            // Find the index of the clicked image in the current filtered list
            currentIndex = filteredImages.findIndex(item => item === clickedItem);

            modalImage.src = imageSrc;
            imageCaption.textContent = imageAlt;
            modal.style.display = 'block';
            
            // Add a class to body to prevent scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside the image
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close with Esc key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- Previous/Next Navigation ---
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : filteredImages.length - 1;
        updateModalImage();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < filteredImages.length - 1) ? currentIndex + 1 : 0;
        updateModalImage();
    });

    function updateModalImage() {
        if (filteredImages.length > 0) {
            const newImage = filteredImages[currentIndex].querySelector('img');
            modalImage.src = newImage.src;
            imageCaption.textContent = newImage.alt;
        }
    }
});