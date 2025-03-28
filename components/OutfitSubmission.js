// OutfitSubmission.js
const OutfitSubmission = ({ challengeId }) => {
    const [products, setProducts] = React.useState([]);
    const [selectedProducts, setSelectedProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
      title: '',
      description: ''
    });
  
    // Fetch available products
    React.useEffect(() => {
      // In a real application, this would be an API call to get products based on the challenge category
      setTimeout(() => {
        const dummyProducts = [
          { id: 1, name: "Women's Summer Dress", image: "resource/clothing1.jpg", category: "women" },
          { id: 2, name: "Men's Casual Shirt", image: "resource/cm1.jpg", category: "men" },
          { id: 3, name: "Kid's T-shirt", image: "resource/ck1.jpg", category: "kids" },
          { id: 4, name: "Women's Blouse", image: "resource/clothing2.jpg", category: "women" },
          { id: 5, name: "Men's Formal Shirt", image: "resource/cm2.jpg", category: "men" },
          { id: 6, name: "Kid's Jeans", image: "resource/ck2.jpg", category: "kids" },
          { id: 7, name: "Women's Jeans", image: "resource/clothing3.jpg", category: "women" },
          { id: 8, name: "Men's Jeans", image: "resource/cm3.jpg", category: "men" },
          { id: 9, name: "Kid's Shorts", image: "resource/ck3.jpg", category: "kids" },
          { id: 10, name: "Women's Skirt", image: "resource/clothing4.jpg", category: "women" },
          { id: 11, name: "Men's T-shirt", image: "resource/cm4.jpg", category: "men" },
          { id: 12, name: "Kid's Dress", image: "resource/ck4.jpg", category: "kids" },
          { id: 13, name: "Women's Jacket", image: "resource/clothing5.jpg", category: "women" },
          { id: 14, name: "Men's Jacket", image: "resource/cm5.jpg", category: "men" },
          { id: 15, name: "Kid's Jacket", image: "resource/ck5.jpg", category: "kids" }
        ];
        
        setProducts(dummyProducts);
        setLoading(false);
      }, 1000);
    }, [challengeId]);
  
    // Handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    // Toggle product selection
    const toggleProductSelection = (productId) => {
      if (selectedProducts.includes(productId)) {
        setSelectedProducts(selectedProducts.filter(id => id !== productId));
      } else {
        // Limit to max 5 products
        if (selectedProducts.length < 5) {
          setSelectedProducts([...selectedProducts, productId]);
        } else {
          alert('You can select a maximum of 5 products for your outfit.');
        }
      }
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (formData.title.trim() === '') {
        alert('Please provide a title for your submission.');
        return;
      }
      
      if (selectedProducts.length === 0) {
        alert('Please select at least one product for your outfit.');
        return;
      }
      
      setSubmitting(true);
      
      // In a real application, this would be an API call
      setTimeout(() => {
        setSubmitting(false);
        setSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({ title: '', description: '' });
          setSelectedProducts([]);
          setSuccess(false);
        }, 3000);
      }, 1500);
    };
  
    if (loading) {
      return <div className="loading">Loading product options...</div>;
    }
  
    if (success) {
      return (
        <div className="submission-success">
          <div className="success-icon">✓</div>
          <h3>Submission Successful!</h3>
          <p>Your outfit has been submitted to the challenge. Thank you for participating!</p>
          <p className="points-earned">You earned 50 participation points!</p>
        </div>
      );
    }
  
    return (
      <div className="submission-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title for Your Outfit</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Give your creation a catchy name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell us about your outfit and why it's perfect for this challenge"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Select Products for Your Outfit (Max 5)</label>
            <div className="products-selector">
              <div className="filter-tabs">
                <button type="button" className="filter-tab active">All</button>
                <button type="button" className="filter-tab">Women</button>
                <button type="button" className="filter-tab">Men</button>
                <button type="button" className="filter-tab">Kids</button>
              </div>
              
              <div className="products-grid">
                {products.map(product => (
                  <div 
                    key={product.id} 
                    className={`product-item ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                    onClick={() => toggleProductSelection(product.id)}
                  >
                    <img src={product.image} alt={product.name} title={product.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="selected-products-preview">
            <h4>Selected Items ({selectedProducts.length}/5)</h4>
            <div className="selected-items">
              {selectedProducts.length > 0 ? (
                selectedProducts.map(id => {
                  const product = products.find(p => p.id === id);
                  return (
                    <div key={id} className="selected-item">
                      <img src={product.image} alt={product.name} />
                      <span>{product.name}</span>
                      <button type="button" onClick={(e) => {
                        e.stopPropagation();
                        toggleProductSelection(id);
                      }}>&times;</button>
                    </div>
                  );
                })
              ) : (
                <p className="no-items-selected">No items selected yet. Click on products to add them to your outfit.</p>
              )}
            </div>
          </div>
          
          <div className="form-footer">
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Outfit'}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  // Render the component on the submission form container
  // Get the challenge ID from the URL
  const getParameterByName = (name, url = window.location.href) => {
    // Simple function to get URL parameters
    const params = new URLSearchParams(url.split('?')[1]);
    return params.get(name);
  };

  {selectedProducts.map(id => {
    const product = products.find(p => p.id === id);
    return (
      <div key={id} className="selected-item">
        <img src={product.image} alt={product.name} />
        <span>{product.name}</span>
        <button 
          type="button" 
          onClick={() => toggleProductSelection(id)}
        >
          &times;
        </button>
      </div>
    );
  })

    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };
  
  const challengeId = getParameterByName('id');
  
  if (document.getElementById('submission-form-container')) {
    ReactDOM.render(
      <OutfitSubmission challengeId={challengeId} />,
      document.getElementById('submission-form-container')
    );
  }